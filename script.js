/// <reference path="./node_modules/@types/p5/global.d.ts" />
const POINTS_COUNT = 20;
let points = [];

function setup() {
    createCanvas(700, 500).parent("sketch");
    background("gray");

    points = createPoints();
}

function draw() {
    // circle(200, 200, 400);

    stroke(255)
    fill(255)
    for (const point of points) {
        circle(point.x, point.y, 7);
    }
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