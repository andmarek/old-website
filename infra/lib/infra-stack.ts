import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import { CloudFrontWebDistribution, HttpVersion, OriginAccessIdentity, PriceClass, SecurityPolicyProtocol, SSLMethod, ViewerCertificate, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const DOMAIN_NAME = "andmarek.com";
    const WWW_DOMAIN_NAME = `www.${DOMAIN_NAME}`;

    const websiteBucket = new Bucket(this, 'static-webiste-bucket', {
      bucketName: 'andmarek.com',
      websiteIndexDocument: 'index.html',
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
      accessControl: BucketAccessControl.PRIVATE,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    });

    const accessIdentity = new OriginAccessIdentity(this, 'CloudfrontAccess');
    const cloudfrontUserAccessPolicy = new PolicyStatement();
    cloudfrontUserAccessPolicy.addActions('s3:GetObject');
    cloudfrontUserAccessPolicy.addPrincipals(accessIdentity.grantPrincipal);
    cloudfrontUserAccessPolicy.addResources(websiteBucket.arnForObjects('*'));
    websiteBucket.addToResourcePolicy(cloudfrontUserAccessPolicy);

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('../src')],
      destinationBucket: websiteBucket,
    });

    const ROOT_INDEX_FILE = 'index.html';

    const cert = new Certificate(this, 'WebCert', {
      domainName: WWW_DOMAIN_NAME,
      subjectAlternativeNames: [DOMAIN_NAME],
      validation: CertificateValidation.fromDns(),
    });

    const cfDist = new CloudFrontWebDistribution(this, 'CfDistribution', {
      comment: 'CDK Cloudfront Secure S3',
      defaultRootObject: ROOT_INDEX_FILE,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      viewerCertificate: ViewerCertificate.fromAcmCertificate(
        cert,
        {
          aliases: ['andmarek.com', 'www.andmarek.com'],
          securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021, // default
          sslMethod: SSLMethod.SNI, // default
        },
      ),
      httpVersion: HttpVersion.HTTP2,
      priceClass: PriceClass.PRICE_CLASS_100, // the cheapest
      originConfigs: [
        {
          s3OriginSource: {
            originAccessIdentity: accessIdentity,
            s3BucketSource: websiteBucket,
          },
          behaviors: [
            {
              compress: true,
              isDefaultBehavior: true,
            },
          ],
        },
      ],
      // Allows React to handle all errors internally
      errorConfigurations: [
        {
          errorCachingMinTtl: 300, // in seconds
          errorCode: 403,
          responseCode: 200,
          responsePagePath: `/${ROOT_INDEX_FILE}`,
        },
        {
          errorCachingMinTtl: 300, // in seconds
          errorCode: 404,
          responseCode: 200,
          responsePagePath: `/${ROOT_INDEX_FILE}`,
        },
      ],
    });

    new CfnOutput(this, 'CfDomainName', {
      value: cfDist.distributionDomainName,
      description: 'Create a CNAME record with name `www` and value of this CF distribution URL',
    });
    new CfnOutput(this, 'CfDistId', {
      value: cfDist.distributionId,
      description:
        'Use this ID to perform a cache invalidation to see changes to your site immediately',
    });
  }
}
