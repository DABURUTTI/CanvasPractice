var sap = 70;

var dots = new Array();
let myFont;

function preload() {
  myFont = loadFont('../../Assets/NotoSansJP-Black.otf');
}
var cntX, cntY;
var offsetX, offsetY;

var offsetXfix, offsetYfix;

function setup() {
  createCanvas(document.body.clientWidth - 3, document.documentElement.clientHeight - 3, WEBGL);
  offsetX = document.body.clientWidth / 2;
  offsetY = document.documentElement.clientHeight / 2;
  //  offsetX = 0;
  //  offsetY = 0;
  cntX = Math.floor(document.body.clientWidth / sap) + 1;
  cntY = Math.floor(document.documentElement.clientHeight / sap) + 1;
  offsetXfix = (width - sap * cntX) / 2;
  offsetYfix = (height - sap * cntY) / 2;
  textFont(myFont);
  var num = 0;
  for (var i = 0; i < cntX; i++) {
    for (var j = 0; j < cntY; j++) {
      var b = new Point(i, j, 0, 10, num);
      num = num + 1;
      dots.push(b);
    }
  }
}

// function windowResized(){
//   setup();
// }

function draw() {
  background(0, 144, 255);
  push();

  //rotateY(radians(frameCount*0.1));
  // rotateZ(radians(-40));
  //rotateX(radians(frameCount*0.1));
  translate(-offsetX + offsetXfix, -offsetY + offsetYfix, 0);
  //rotateZ(radians(-10));
  //translate(-100,300,00);
  dots.forEach(Element => {
    Element.update();
    Element.draw();
  })
  pop();
}



class Point {
  constructor(x, y, z, size, id) {
    this.x_o = x * sap;
    this.y_o = y * sap;
    this.z_o = z * sap;
    this.x = x * sap;
    this.y = y * sap;
    this.z = z * sap;
    this.size = size;
    //this.id = this.calcID(x,y);
    this.id = id;
  }

  calcID(x, y) {
    var px = 1;
    var py = 1;

    // for(var i = x; x > 0 ; i--){
    //   for(var j = y ; y > 0 ; j--){

    //   }
    // }

    x++;
    y++;

    var num = 0;
    while (true) {
      num = num + 1;
      if (px === x) {
        if (py === y) {
          break;
        }
      }

      if (py === 1) {
        if (px >= cntY) {
          px = px - cntY + 2;
          py = cntX;
          continue;
        }

      }

      if (py === 1) {
        py = px + 1;
        px = 1;
        continue;
      }

      px++;
      py--;
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
    var value = 0;
    //var vector = [this.move_rows(),this.move_circle()];
    var vactor = this.move_noise();
    this.x = vactor[0];
    this.y = vactor[1];
    this.z = vactor[2];


    //  this.x = map(value, 0, 700, vector[0][0], vector[1][0]);
    //  this.y = map(value, 0, 700, vector[0][1], vector[1][1]);
    //  this.z = map(value, 0, 700, vector[0][2], vector[1][2]);
  }

  move_rows() {
    var x = this.x_o;
    var y = this.y_o;
    var z = sin(radians((frameCount * 100 + this.x) * 1 + this.y * 1)) * 100;
    return [x, y, z];
  }

  move_noise() {
    var x = this.x_o;
    var y = this.y_o;
    var z = 0;
    var z = noise((this.x + frameCount * 10) * 0.0002, this.y * 0.0002, 100) * 300;
    return [x, y, z];
  }

  move_circle() {
    var x = sin(radians(map(this.id, 0, 100, 0, 360)) + 0) * 1000;
    var y = cos(radians(map(this.id, 0, 100, 0, 360)) + 0) * 1000;
    return [x, y, 0];
  }




  draw() {
    noStroke();
    //fill(255, 74, 71,this.z);
    fill(80);
    push();
    //rotateY(frameCount * 0.1);
    //translate( map(this.x, 0, 100, -960, 960),  map(this.y, 0, 100, -540, 540),this.z);
    translate(this.x, this.y, this.z);

    //rotateY(frameCount * 0.1);
    //rotateZ(radians(90));


    fill(240,this.z - this.x * 0.1);
    strokeWeight(1);
    //stroke(255,65,23);
    noStroke();
    ellipse(0, 0, this.size, this.size);

    // beginShape(LINES);
    // vertex(0, 5);
    // vertex(0, -5);
    // vertex(5, 0);
    // vertex(-5, 0);
    // endShape();
    // line(0, 5, 0, -5);
    // fill(0);
    // text(Math.floor(this.z),5,15);
    pop();
  }
}