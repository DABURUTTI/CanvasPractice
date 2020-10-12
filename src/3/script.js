

var sap = 40;

var dots = new Array();
//let myFont;
function preload() {
 /// myFont = loadFont('../../Assets/NotoSansJP-Black.otf');
}
var cntX,cntY;
var offsetX,offsetY;
function setup() {
  createCanvas(document.body.clientWidth-3,document.documentElement.clientHeight-3, WEBGL);
 offsetX = document.body.clientWidth/2;
 offsetY = document.documentElement.clientHeight/2;
  cntX = Math.floor(document.body.clientWidth / sap);
  cntY = Math.floor(document.documentElement.clientHeight / sap);
 // textFont(myFont);
    var num = 0;
    for(var i = 0; i < cntX; i ++){
      for(var j = 0; j < cntY; j++){
        var b  = new Point(i ,j ,0,10,num);
        num = num + 1;
        dots.push(b);
      }
    }
}

// function windowResized(){
//   setup();
// }

function draw() {
  background(
    255, 188, 31
    );
  push();
  translate(-offsetX,-offsetY,-0);

    dots.forEach(Element => {
      Element.update();
      Element.draw();
    })
    pop();
 }



class Point {
    constructor(x,y,z,size,id) {
      this.x_o = x* sap;
      this.y_o = y* sap;
      this.z_o = z* sap;
      this.x = x* sap;
      this.y = y* sap;
      this.z = z* sap;
      this.size = size;
      this.id = this.calcID(x,y);
    }

    calcID(x,y){
      var px = 1;
      var py = 1;

      // for(var i = x; x > 0 ; i--){
      //   for(var j = y ; y > 0 ; j--){

      //   }
      // }

      x ++;
      y ++;

      var num = 0;
      while(true){
        num = num + 1;
        if(px === x){
          if(py == y){
            break;
          }
        }

        if(px === cntX){
          px = py+1;
          py = cntX;
          continue;
        }

        if(py === 1){
          py = px + 1;
          px = 1;
          continue;
        }
        
        px ++;
        py --;
        //console.log(px);
      }
      return num;
      // var num = 1;
      // for(var j = 0; j < y+1 ; j++){
      //   num = num + j;
      // }

      // for(var j = 0; j < x ; j++){
      //   num = num + y + j + 2;
      // }
      // return num;
    }

    // update(x,y,z,size) {
    //   this.x = x;
    //   this.y = y;
    //   this.z = z;
    //   this.size = size;
    // }

    update() {
    
      //var  value = frameCount % 700;
      var  value = 0;
       //var vector = [this.move_rows(),this.move_circle()];
       var vactor = this.move_noise();
       this.x = vactor[0];
       this.y = vactor[1];
       this.z = vactor[2];

    
      //  this.x = map(value, 0, 700, vector[0][0], vector[1][0]);
      //  this.y = map(value, 0, 700, vector[0][1], vector[1][1]);
      //  this.z = map(value, 0, 700, vector[0][2], vector[1][2]);
    }

    move_rows(){
      var x = this.x_o;
      var y = this.y_o;
      var z = sin(radians((frameCount*100 + this.x )*1 + this.y*1))*10;
      return [x,y,z];
    }

    move_noise(){
      var x = this.x_o;
      var y = this.y_o;
      var z = noise((this.x + frameCount*1)*0.0005, this.y*0.0005,100) * 500;
      return [x,y,z];
    }

    move_circle(){
      var x = sin(radians(map(this.id, 0, 100, 0, 360)) + 0)*1000;
      var y = cos(radians(map(this.id, 0, 100, 0, 360)) + 0)*1000;
      return [x,y,0];
    }




    draw() {
      noStroke();
      //fill(255, 74, 71,this.z);
      fill(46, 46, 46);
      push();
      //translate( map(this.x, 0, 100, -960, 960),  map(this.y, 0, 100, -540, 540),this.z);
      translate( this.x,this.y,this.z);
      
      //rotateY(frameCount * 0.1);
      //rotateZ(radians(90));
      ellipse(0,0,this.z * 0.05,this.z*0.05);
      fill(0);
     // text(this.z,-3,3);
      pop();
    }
  }