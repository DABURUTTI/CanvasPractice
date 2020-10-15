var dots = new Array();
let myFont;
function preload() {
  myFont = loadFont('../../Assets/NotoSansJP-Black.otf');
}

function setup() {
  createCanvas(document.body.clientWidth,document.documentElement.clientHeight, WEBGL);
  textFont(myFont);
    var num = 0;
    for(var i = 0; i < 10; i ++){
      for(var j = 0; j < 10; j++){
        var b  = new Point(i ,j ,0,50,num);
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
      this.x_o = x* 100;
      this.y_o = y* 100;
      this.z_o = z* 100;
      this.x = x* 100;
      this.y = y* 100;
      this.z = z* 100;
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

        if(px === 10){
          px = py+1;
          py = 10;
          continue;
        }

        if(py === 1){
          py = px + 1;
          px = 1;
          continue;
        }
        
        px ++;
        py --;
        console.log(px);
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
       var vector = [this.move_rows(),this.move_circle()];
       this.x = map(value, 0, 700, vector[0][0], vector[1][0]);
       this.y = map(value, 0, 700, vector[0][1], vector[1][1]);
       this.z = map(value, 0, 700, vector[0][2], vector[1][2]);
    }

    move_rows(){
      var x = this.x_o;
      var y = this.y_o;
      var z = sin(radians(frameCount*1 + this.x *0.1 + this.y*0.1))*50;
      return [x,y,z];
    }

    move_circle(){
      var x = sin(radians(map(this.id, 0, 100, 0, 360)) + 0)*1000;
      var y = cos(radians(map(this.id, 0, 100, 0, 360)) + 0)*1000;
      return [x,y,0];
    }




    draw() {
      noStroke();
      fill(84, 165, 227,this.id);
      push();
      //translate( map(this.x, 0, 100, -960, 960),  map(this.y, 0, 100, -540, 540),this.z);
      translate( this.x,this.y,this.z);
      
      //rotateY(frameCount * 0.1);
      //rotateZ(radians(90));
      ellipse(0,0,this.size,this.size);
      fill(0);
      text(this.id,-3,3);
      pop();
    }
  }