import {
  drawCircle,
  drawOval,
  drawRectangle,
  drawLine,
  Pen,
  Eraser,
} from "./Shapes";
import { PolygonLasso } from "./lassoTool/Lasso";
import { React, useCallback, useRef, useEffect, useState } from "react";
function Page(props) {
  //new
  const canvasRef = useRef(null);
  const tempRef = useRef(null);
  const ctx = useRef(null);
  const tempctx = useRef(null);
  const editRef = useRef(null);
  const editctx = useRef(null);
  const [image, setimage] = useState(null);
  const firstUpdate = useRef(true);
  // const [margin_y,setmargin]=useState(-props.CurrHeight)
  var margin_y = -props.number * props.CurrHeight;
  //need to change margin_y such that it has total previous height
  useEffect(() => {
    if (canvasRef.current && tempRef.current) {
      if (!props.Refs.includes(canvasRef)) {
        props.Refs.push(canvasRef);
      }
      if (!props.WritingRefs.includes(tempRef)) props.WritingRefs.push(tempRef);
      ctx.current = canvasRef.current.getContext("2d");
      ctx.current.fillStyle = "#ffffff";
      editctx.current = editRef.current.getContext("2d");
      editctx.current.clearRect(
        0,
        0,
        editRef.current.width,
        editRef.current.height
      );
      ctx.current.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (!props.TempRefs.includes(ctx)) props.TempRefs.push(ctx);
      tempctx.current = tempRef.current.getContext("2d");
      tempctx.current.clearRect(
        0,
        0,
        tempRef.current.width,
        tempRef.current.height
      );
    }
    if (firstUpdate.current) {
      firstUpdate.current = false;
      if (props.images[props.number] === undefined)
        props.images[props.number] = [];
      document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.key === "z") {
          // document.getElementById('undo').click();
          props.undo();
        } else if (e.ctrlKey && e.key === "y") {
          props.redo();
          // document.getElementById('redo').click();
        }
      });
    }
  }, [firstUpdate]);
  //common
  // function grid() {
  //     if(gridRef.current!=null){
  //         for(var i=0;i<gridRef.current.height/80;i++){
  //             drawLine(gridctx,"#d3d3d3",1,{x:0,y: 53 + 80*i},gridRef.current.width,53 + 80*i,0);
  //             drawLine(gridctx,"#d3d3d3",1,{x:0,y: i*80},gridRef.current.width,i*80,0);
  //         }
  //     }
  // }
  const draw = useCallback(
    (x, y) => {
      if (props.shape === "pen") {
        if (!props.mouseDown) {
          return;
        } else if (props.mouseDown) {
          tempctx.current.strokeStyle = "#000000";
          Pen(
            tempctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          ); //helps make line visible
          props.setPosition({ x, y });
        }
      } else if (props.shape === "oval") {
        if (!props.mouseDown && props.drawing) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          drawOval(
            tempctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setPosition({ x, y });
          props.setDrawing(false);
          return;
        } else if (props.mouseDown) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          drawOval(
            editctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setDrawing(true);
        }
      } else if (props.shape === "circle") {
        if (!props.mouseDown && props.drawing) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          drawCircle(
            tempctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setPosition({ x, y });
          props.setDrawing(false);
          return;
        } else if (props.mouseDown) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          ); //need to find a way to save canvas
          drawCircle(
            editctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setDrawing(true);
        }
      } else if (props.shape === "rectangle") {
        if (!props.mouseDown && props.drawing) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          drawRectangle(
            tempctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setPosition({ x, y });
          props.setDrawing(false);
          return;
        } else if (props.mouseDown) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          ); //need to find a way to save canvas
          drawRectangle(
            editctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setDrawing(true);
        }
      } else if (props.shape === "line") {
        if (!props.mouseDown && props.drawing) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          drawLine(
            tempctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setPosition({ x, y });
          props.setDrawing(false);
          return;
        } else if (props.mouseDown) {
          editctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          ); //need to find a way to save canvas
          drawLine(
            editctx,
            props.selectedColor,
            props.size,
            props.last,
            x,
            y,
            0,
            margin_y
          );
          props.setDrawing(true);
        }
      } else if (props.shape === "eraser") {
        if (!props.mouseDown) {
          return;
        } else if (props.mouseDown) {
          Eraser(
            tempctx,
            "#ffffff",
            props.erasersize,
            props.last,
            x,
            y,
            0,
            margin_y,
            6
          ); //helps make line visible
          props.setPosition({ x, y });
        }
      } else if (props.shape === "select") {
        if (!props.mouseDown && props.drawing) {
          tempctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          var imgData = ctx.current.getImageData(
            props.last.x,
            props.last.y + margin_y,
            Math.abs(x - props.last.x),
            Math.abs(props.last.y - y)
          );
          tempctx.current.putImageData(
            imgData,
            props.last.x,
            props.last.y + margin_y
          );
          ctx.current.clearRect(
            props.last.x,
            props.last.y + margin_y,
            Math.abs(x - props.last.x),
            Math.abs(props.last.y - y)
          );
          drawRectangle(ctx, "grey", 1, props.last, x, y, 0, margin_y);
          setimage(imgData);
          props.setPosition({ x, y });
          //implement a drag function then finalize image to temp
          props.setDrawing(false);
          return;
        } else if (props.mouseDown) {
          tempctx.current.clearRect(
            0,
            0,
            tempRef.current.width,
            tempRef.current.height
          );
          drawRectangle(tempctx, "black", 1, props.last, x, y, 0, margin_y);
          props.setDrawing(true);
        }
      }
    },
    [
      props.last,
      props.mouseDown,
      props.selectedColor,
      props.shape,
      props.size,
      props.drawing,
      props.setDrawing,
      margin_y,
      props.Ref,
    ]
  );
  const onMouseDown = (e) => {
    // margin_y=-200;
    if (e.changedTouches == undefined) {
      props.setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    } else {
      props.setPosition({
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY,
      });
    }
    for (var i = 0; i < props.setshow.length; i++) props.setshow[i](false);
    props.setMouseDown(true);
  };
  const onMouseUp = (e) => {
    if (props.mouseDown) {
      if (props.images[props.number] === undefined)
        props.images[props.number] = [];
      if (props.redoimages[props.number] === undefined)
        props.redoimages[props.number] = [];
      props.images[props.number].push(tempRef.current.toDataURL("image/png"));
    }
    props.setMouseDown(false);
  };
  const onMouseMove = (e) => {
    // props.setPagenumber(props.pagenum+1);
    props.setCanvasRef(tempRef); //need to change to  temp
    props.setCtx(tempctx);
    // grid();
    if (e.changedTouches == undefined) draw(e.pageX, e.pageY);
    else draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
  };
  //for pagenumber might have to use pageX values
  return (
    <div className="App">
      <canvas
        id={props.number}
        className="inner1"
        style={{ top: -margin_y, touchAction: "none" }}
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        width={props.width}
        height={props.Height}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchCancel={onMouseUp}
        onTouchMove={onMouseMove}
      ></canvas>
      <canvas
        id={props.number + "edit"}
        className="inner1"
        style={{ top: -margin_y, touchAction: "none" }}
        ref={editRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        width={props.width}
        height={props.Height}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchCancel={onMouseUp}
        onTouchMove={onMouseMove}
      ></canvas>
      <canvas
        id={props.number + "temp"}
        className="inner1"
        style={{ top: -margin_y, touchAction: "none" }}
        ref={tempRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        width={props.width}
        height={props.Height}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchCancel={onMouseUp}
        onTouchMove={onMouseMove}
      ></canvas>
      {/* replace all the select tags with buttons */}
    </div>
  );
}
export default Page;
