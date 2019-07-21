/// <reference path="./node_modules/@types/p5/global.d.ts" />

function setup() {

    createCanvas(700, 500).parent("sketch");
    background(0);
}

function draw() {
    circle(200, 200, 400);
}