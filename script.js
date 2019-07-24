/// <reference path="./node_modules/@types/p5/global.d.ts" />
const POINTS_COUNT = 20;
let points = [];

let triangle = [];

function setup() {
    createCanvas(700, 500).parent("sketch");

    // points = createPoints();
}

function draw() {
    background("gray");    
    // circle(200, 200, 400);

    stroke(255)
    fill(255)
    // for (const point of points) {
    //     circle(point.x, point.y, 7);
    // }

    for (const point of triangle) {
        circle(point.x, point.y, 7);
    }

    arrow(width / 2, 0, width / 2, 70);
}

function mousePressed() {
    if (triangle.length >= 3)
        triangle.length = 0;

    triangle.push(createVector(mouseX, mouseY));
}

function arrow(x1, y1, x2, y2) {
    let headLenght = 30;
    const angle = atan2(y2 - y1, x2 - x1);

    line(x1, y1, x2, y2);

    let x = headLenght * cos(angle - PI / 4 + PI) + x2;
    let y = headLenght * sin(angle - PI / 4 + PI) + y2;
    line(x2, y2, x, y);

    x = headLenght * cos(angle + PI / 4 + PI) + x2;
    y = headLenght * sin(angle + PI / 4 + PI) + y2;
    line(x2, y2, x, y);

}

function getPointCount() {
    return POINTS_COUNT;
}

function createPoints() {
    const padding = 40;

    const points = [];

    for (let i = 0, count = getPointCount(); i < count; i++) {
        const x = random(padding, width - padding);
        const y = random(padding, height - padding);

        points.push(createVector(x, y));
    }

    return points;
}