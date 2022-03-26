import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      bucketName: 'andmarek.com',
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });
    
    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('../src')],
      destinationBucket: websiteBucket,
    });
  }
}
