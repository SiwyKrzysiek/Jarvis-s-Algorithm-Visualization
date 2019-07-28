/// <reference path="./node_modules/@types/p5/global.d.ts" />

const POINTS_COUNT = 20;
let points = [];
let shapeIndexes = [];
let nextVertexIndex = 1;
let checkingIndex = 2;

let triangle = [];

const Orientations = Object.freeze({
    CLOCKWISE:   Symbol("clockwise"),
    COUNTER_CLOCKWISE:  Symbol("counter clockwise")
});

p5.Vector.prototype[Symbol.iterator] = function* () {
    yield this.x;
    yield this.y;
};

Array.prototype.last = function () {
    return this[this.length - 1];
}
Array.prototype.first = function () {return this[0]; };

function setup() {
    createCanvas(700, 500).parent("sketch");

    points = createPoints();
    shapeIndexes.push(findStartingPoint(points));
}

function draw() {
    background("gray");
    // circle(200, 200, 400);

    stroke(255)
    fill(255)
    for (const point of points) {
        circle(point.x, point.y, 7);
    }

    //Starting point
    stroke("green");
    fill("green");
    circle(...points[shapeIndexes[0]], 10);

    let previousPoint = points[shapeIndexes.last()];
    let checkingPoint = points[checkingIndex];
    let nextCandidatePoint = points[nextVertexIndex];

    //Next candidate
    stroke("#2d85eb");
    line(...previousPoint, ...nextCandidatePoint);

    //Currently checking point
    stroke(255);
    line(...previousPoint, ...checkingPoint);

    let checkTriangle = [previousPoint, nextCandidatePoint, checkingPoint];
    let orientation = calculateTriangleOrentation(checkTriangle);
    if (orientation === Orientations.COUNTER_CLOCKWISE) {
        nextCandidatePoint = checkingPoint;
    }

    checkingIndex = checkingIndex + 1 % points.length;

    // displayPartialTriangle(triangle);

    // if (triangle.length == 3) {
    //     console.log(calculateTriangleOrentation(triangle));
    // }
}

/**
 * Summary. Finds starting point for wrapping algorithm
 * 
 * @param {Array<p5.Vector>} points Starting points for Wrapping algorithm
 * @return {number} Index of starting point
 */
function findStartingPoint(points) {
    let result = 0;

    for (let i = 1; i < points.length; i++) {
        if (points[i].x < points[result].x)
            result = i;
    }

    return result;
}

function mousePressed() {
    if (triangle.length >= 3)
        triangle.length = 0;

    triangle.push(createVector(mouseX, mouseY));
}

function calculateTriangleOrentation(triangle) {
    if (triangle.length != 3) 
        throw new Error("Triangle must have 3 points");

    const v1 = createVector(triangle[1].x - triangle[0].x, triangle[1].y - triangle[0].y);
    const v2 = createVector(triangle[2].x - triangle[1].x, triangle[2].y - triangle[1].y);

    return v1.cross(v2).z > 0 ? Orientations.CLOCKWISE : Orientations.COUNTER_CLOCKWISE;
}

function displayPartialTriangle(triangle) {
    const verexSize = 7;

    if (triangle.length > 3)
        throw new Error("Partial triangle can't have more than 3 points");

    for (const point of triangle) {
        circle(...point, verexSize);
    }

    for (let i = 1; i < triangle.length; i++) {
        const prev = triangle[i - 1];
        const curr = triangle[i];

        arrow(...prev, ...curr);
    }

    if (triangle.length == 3)
        arrow(...triangle[2], ...triangle[0]);
}

function arrow(x1, y1, x2, y2) {
    let headLenght = 25;
    const armsAngle = PI / 7;

    const arrowLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = atan2(y2 - y1, x2 - x1);

    if (headLenght > arrowLength / 3) 
        headLenght = arrowLength / 3;

    line(x1, y1, x2, y2);

    // Draw arms
    for (let i of [1, -1]) {
        let x = headLenght * cos(angle + i*armsAngle + PI) + x2;
        let y = headLenght * sin(angle + i*armsAngle + PI) + y2;
        line(x2, y2, x, y);
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