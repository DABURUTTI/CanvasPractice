var b;

function setup() {
    createCanvas(document.body.clientWidth,document.documentElement.clientHeight, WEBGL);
    b  = new Point(0,0, 600);
}
    

function draw() {
    background(255);
    b.draw();
 }

class Point {
  
    constructor(x,y,z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    draw() {
      push();
      translate(0, 0,700);
      rotateY(frameCount * 0.001);
      //rotateZ(radians(90));
      ellipse(this.x,this.y,10,10);
      pop();
      //z += 1;
    }
  }