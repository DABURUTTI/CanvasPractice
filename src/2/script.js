var dots = new Array();

function setup() {
    createCanvas(document.body.clientWidth,document.documentElement.clientHeight, WEBGL);
    var num = 0;
    for(var i = 0; i < 10; i ++){
      for(var j = 0; j < 10; j++){
        var b  = new Point(i * 100,j * 100,0,50,num);
        num = num + 1;
        dots.push(b);
      }
    }
}
    

function draw() {
  push();
  translate(-500,-450,-0);
    background(255);
    dots.forEach(Element => {
      Element.update();
      Element.draw();
    })
    pop();
 }



class Point {
  
    constructor(x,y,z,size,id) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.id = id;
    }
  
    update(x,y,z,size) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
    }

    updateByown(){
      this.z = sin(radians(frameCount*1 + this.x *0.1 + this.y*0.1))*50;
      return [0,0,z];
    }

    update(){
      var x = sin(radians(map(this.id, 0, 100, 0, 360)) + frameCount)*1000;
      var y = cos(radians(map(this.id, 0, 100, 0, 360)) + frameCount)*1000;
      return [x,y,0];
    }

    draw() {
      noStroke();
      fill(84, 165, 227);
      push();
      //translate( map(this.x, 0, 100, -960, 960),  map(this.y, 0, 100, -540, 540),this.z);
      translate( this.x,this.y,this.z);
      
      //rotateY(frameCount * 0.1);
      //rotateZ(radians(90));
      ellipse(0,0,this.size,this.size);
      pop();
    }
  }