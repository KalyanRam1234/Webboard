// import { useState, useRef, useEffect } from "react";

// function LassoTool() {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [endX, setEndX] = useState(0);
//   const [endY, setEndY] = useState(0);
//   const [lassoPoints, setLassoPoints] = useState([]);
//   const [imageData, setImageData] = useState(null);
//   const [imageDataArray, setImageDataArray] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.strokeStyle = "red";
//     ctx.lineWidth = 2;
//   }, []);

//   const startDrawing = (e) => {
//     setIsDrawing(true);
//     setStartX(e.clientX - canvasRef.current.offsetLeft);
//     setStartY(e.clientY - canvasRef.current.offsetTop);
//     setLassoPoints([{ x: startX, y: startY }]);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     setEndX(e.clientX - canvasRef.current.offsetLeft);
//     setEndY(e.clientY - canvasRef.current.offsetTop);
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.moveTo(startX, startY);
//     ctx.lineTo(endX, endY);
//     ctx.stroke();
//     setStartX(endX);
//     setStartY(endY);
//     setLassoPoints((prevState) => [...prevState, { x: startX, y: startY }]);
//   };

//   const endDrawing = () => {
//     setIsDrawing(false);
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.closePath();
//     setLassoPoints((prevState) => [
//       ...prevState,
//       { x: prevState[0].x, y: prevState[0].y },
//     ]);
//     setImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
//     setImageDataArray(imageData.data);
//   };

//   const getPointsInsideLasso = () => {
//     let xMin = Infinity;
//     let xMax = -Infinity;
//     let yMin = Infinity;
//     let yMax = -Infinity;

//     for (const point of lassoPoints) {
//       if (point.x < xMin) {
//         xMin = point.x;
//       }
//       if (point.x > xMax) {
//         xMax = point.x;
//       }
//       if (point.y < yMin) {
//         yMin = point.y;
//       }
//       if (point.y > yMax) {
//         yMax = point.y;
//       }
//     }

//     const pointsInside = [];

//     for (let x = xMin; x <= xMax; x++) {
//       for (let y = yMin; y <= yMax; y++) {
//         if (isPointInsideLasso(x, y, lassoPoints)) {
//           const index = (y * imageData.width + x) * 4;
//           const rgba = [
//             imageDataArray[index],
//             imageDataArray[index + 1],
//             imageDataArray[index + 2],
//             imageDataArray[index + 3],
//           ];
//           pointsInside.push({ x, y, rgba });
//         }
//       }
//     }

//     console.log(pointsInside);


  
//   }















import { useRef, useState } from "react";

function PolygonLasso() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageDataArray, setImageDataArray] = useState([]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setStartX(e.clientX - canvasRef.current.offsetLeft);
    setStartY(e.clientY - canvasRef.current.offsetTop);
    setPolygonPoints([{ x: startX, y: startY }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    setEndX(e.clientX - canvasRef.current.offsetLeft);
    setEndY(e.clientY - canvasRef.current.offsetTop);
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    setStartX(endX);
    setStartY(endY);
    setPolygonPoints([...polygonPoints, { x: startX, y: startY }]);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setPolygonPoints([
      ...polygonPoints,
      { x: polygonPoints[0].x, y: polygonPoints[0].y },
    ]);
    setImageData(
      canvasRef.current
        .getContext("2d")
        .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    );
    setImageDataArray(
      canvasRef.current
        .getContext("2d")
        .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        .data
    );
  };

  const getPointsInsidePolygon = (points) => {
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
            imageDataArray[index + 3],
          ];
          pointsInside.push({ x, y, rgba });
        }
      }
    }

    return pointsInside;
  };

  const isPointInsidePolygon = (points, x, y) => {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x,
        yi = points[i].y;
      const xj = points[j].x,
        yj = points[j].y;
      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  };
}

export default PolygonLasso;
