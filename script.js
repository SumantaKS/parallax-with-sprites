"use strict";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //to use tools provided by canvas api for drawing

const canvasWidth = (canvas.width = 800); //default is 300x150
const canvasHeight = (canvas.height = 700);

const layer1 = new Image();
layer1.src = "img/layer-1.png";
const layer2 = new Image();
layer2.src = "img/layer-2.png";
const layer3 = new Image();
layer3.src = "img/layer-3.png";
const layer4 = new Image();
layer4.src = "img/layer-4.png";
const layer5 = new Image();
layer5.src = "img/layer-5.png";

let frameSpeed = 5; //can be dynamically controlled by the user

class Layer {
  //fixedSpeed is used on top of frameSpeed to globally control speed of all layers at once using only one variable(frameSpeed)
  constructor(image, fixedSpeed) {
    this.image = image;
    this.fixedSpeed = fixedSpeed;
    this.width = 2400;
    this.height = 700;
    this.x = 0;
    this.x2 = this.width; //image is duplicated to simulate the illusion of continuos side-scroll, since there is a gap of 2400px when image is reseted in method below
    this.y = 0;
    this.gameSpeed = frameSpeed * this.fixedSpeed;
  }

  resetFrame() {
    // this.gameSpeed = frameSpeed * this.fixedSpeed;
    //when image crosses -2400px limit
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - frameSpeed;
      //can use any other logic/algo
      //that eliminates the gap between the two images
      //gap is formed because of frameSpeed(px) implementation of the two images
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - frameSpeed;
    }
    //when image hasn't crossed -2400px limit
    this.x = Math.floor(this.x - this.gameSpeed);
    this.x2 = Math.floor(this.x2 - this.gameSpeed);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layerImg1 = new Layer(layer1, 0.2);
const layerImg2 = new Layer(layer2, 0.4);
const layerImg3 = new Layer(layer3, 0.6);
const layerImg4 = new Layer(layer4, 0.8);
const layerImg5 = new Layer(layer5, 1);

const layers = [layerImg1, layerImg2, layerImg3, layerImg4, layerImg5];

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  layers.forEach((layerObject) => {
    layerObject.resetFrame();
    layerObject.draw();
  });
  requestAnimationFrame(animate);
}
animate();
