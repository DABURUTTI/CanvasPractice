
var logoImage;
var fixedLogoImage;

var px = 20;

var Points = new Array();

var imgSizeX = 648;
var imgSizeY = 405;

let font;
function preload() {
    logoImage =  loadImage("../img/logo_w.png");
    font = loadFont("../assets/NotoSansJP-Black.otf");
    // fixedLogoImage = createCanvas(window.innerWidth, window.innerHeight);
    // fixedLogoImage.image();
}



function setup(){
    createCanvas(window.innerWidth, window.innerHeight, WEBGL)

    textFont(font);

    for(var i = 0; i * px < imgSizeX ; i ++){
        for(var j = 0; j * px < imgSizeY ; j ++){
            if(logoImage.get(i * px,j * px)[2] === 255){
                Points.push(new Vector(i,j));
            };
        }
    }

}

function draw(){
    background(255);
    Points.forEach(element => {
        fill(0);

        var x  = map(element.x * px, 0, imgSizeX, -window.innerWidth/2, window.innerWidth/2)
        var y  = map(element.y * px, 0, imgSizeY, -window.innerHeight/2, window.innerHeight/2)
        //ellipse(element.x * px,element.y * px, 5, 5);
        //ellipse(x ,y, 5, 5);
        rect(x ,y, px, px);
    });

    drawDebugOverlay();
}


function drawDebugOverlay(){
    textSize(20);
    noStroke();
    rect(5 - window.innerWidth/2, window.innerHeight/2 - 30,250,25);
    fill(255);
    text(`FPS - ${(int)(frameCount / (millis() / 1000))} : DEBUG-MODE`,10 - window.innerWidth/2, window.innerHeight/2 - 10)

}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}