var id = null;


/*   
let main = () => {
    let pos = 0;
    var go_back = 0;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;


    var elem = document.getElementById("animated-image");

    clearInterval(id);
    id = setInterval(function() {
        if (go_back == 1) {
        //clearInterval(id);
        pos--;
        elem.style.left = pos + 'px';
        if (pos <= 0) {
            go_back = 0;
        }
        } else {
            pos++; 
            elem.style.left = pos + 'px'; 
            if (pos >= innerWidth) {
                go_back = 1;
            }
        }
    }, 0.0001);
  
}
*/

//document.addEventListener('DOMContentLoaded', main, false);


/* keys */
var dx = 0, dy = 0;
var speed = 100; // px per second

var elem = document.getElementById("animated-image");
let verticalPosition = 0;
let horizontalPosition = 0;
var activeKey = 0;
document.addEventListener('keydown', function(e) {
    console.log(e);
    var elem = document.getElementById("animated-image");
    activeKey = e.key;
    
    //left
    if (e.key == 'ArrowLeft') {
        horizontalPosition-=10;
        elem.style.left = horizontalPosition + 'px';
        console.log('start moving LEFT');
        dx = -1;
    }
    //top
    else if (e.key == 'ArrowDown') {
        verticalPosition+=10;
        console.log(elem.style.top);
        elem.style.top = verticalPosition + 'px';
        dy = -1;
    }
    //right
    else if (e.key == 'ArrowRight') {
        horizontalPosition+=10;
        elem.style.left = horizontalPosition + 'px';
        console.log('start moving RIGHT');
        dx = 1;
    }
    //bottom
    else if (e.key == 'ArrowUp') {
        verticalPosition-=10;
        elem.style.top = verticalPosition + 'px';
        dy = 1;
    }
});

document.addEventListener('keyup', function(e) {
    switch (e.key) {
        case 'ArrowLeft': // left
        case 'ArrowRight': // rightx
            console.log('stop moving HOR');
            dx = 0;
            break;
            
        case 'ArrowUp': // up
        case 'ArrowDown': // down
            console.log('stop moving VER');
            dy = 0;
            break;
    }
    
    //activeKey = 0;
});
