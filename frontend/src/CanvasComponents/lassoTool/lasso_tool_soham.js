/*
This program returns X,Y, rgba of all points inside whatever closed surface 
is drawn with the help of the lasso tool which will be used in the following way:
Data of all the points inside is given to OpenCV ML code that will then perform the edge detection 
which will give data to the hardware-ring thing put on the finger.
You can test this code by seeing what console logs in dev tool (an array of data of all 
the points inside the closed shape).
You can integrate it to the main code by , making a lasso tool icon in the sidebar and onClcick  just 
calls this whole thing as a callback or something.
*/



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let startX, startY;
let endX, endY;
let polygonPoints = [];
let imageData;
let imageDataArray = [];

// everytime movemove event occurs draw() callback function is called 
canvas.addEventListener('mousedown', start_drawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', end_drawing);

function start_drawing(e) {
    isDrawing = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    polygonPoints.push({ x: startX, y: startY });
}

function draw(e) {
    if (!isDrawing) return;

    endX = e.clientX - canvas.offsetLeft;
    endY = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    startX = endX;
    startY = endY;
    polygonPoints.push({ x: startX, y: startY });
}

function end_drawing() {
    isDrawing = false;
    ctx.closePath();
    polygonPoints.push({ x: polygonPoints[0].x, y: polygonPoints[0].y });
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageDataArray = imageData.data;
    const pointsInsidePolygon = getPointsInsidePolygon(polygonPoints);
    console.log(pointsInsidePolygon);
}

function getPointsInsidePolygon(points) {
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;

    for (const point of points) {
        if (point.x < xMin) {
            xMin = point.x;
        }
        if (point.x > xMax) {
            xMax = point.x;
        }
        if (point.y < yMin) {
            yMin = point.y;
        }
        if (point.y > yMax) {
            yMax = point.y;
        }
    }

    const pointsInside = [];

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            if (isPointInsidePolygon(points, x, y)) {
                const index = (y * imageData.width + x) * 4;
                const rgba = [
                    imageDataArray[index],
                    imageDataArray[index + 1],
                    imageDataArray[index + 2],
                    imageDataArray[index + 3]
                ];
                pointsInside.push({ x, y, rgba });
            }
        }
    }

    return pointsInside;
}

function isPointInsidePolygon(points, x, y) {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].x, yi = points[i].y;
        const xj = points[j].x, yj = points[j].y;
        const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
}