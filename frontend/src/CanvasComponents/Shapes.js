function arc(ctx,x1,y1,x2,y2,xx=0,yy=0,initialAngle=0,finalAngle=(2*Math.PI),scale=1,direction=true){
    var newX = x1 * scale;
    var newY = y1 * scale;

    var newX2 = x2 * scale;
    var newY2 = y2 * scale;

    const radius = Math.sqrt( Math.pow((newX2 - newX) ,2) + Math.pow((newY2 - newY) ,2) );
    ctx.arc(newX +xx,newY + yy, radius,initialAngle,finalAngle,direction );
}
function moveTo(ctx,x1,y1,xx=0,yy=0,scale=1){
    var newX = x1 * scale;
    var newY = y1 * scale;
    ctx.moveTo(newX + xx, newY + yy);
}
function lineTo(ctx, x1, y1, xx=0, yy=0, scale=1) {

    var newX = x1 * scale;
    var newY = y1 * scale;

    ctx.lineTo(newX + xx, newY + yy);
}
export function drawCircle(ctx,selectedColor,size,last,x,y,margin_x=0,margin_y=0){
    ctx.current.lineJoin= 'round';
    ctx.current.strokeStyle=selectedColor;
    ctx.current.lineWidth=size;
    ctx.current.beginPath();
    arc(ctx.current,last.x+margin_x, last.y+margin_y, x+margin_x,y+margin_y);
    ctx.current.closePath();
    ctx.current.stroke();
}
export function drawOval(ctx,selectedColor,size,last,x,y,margin_x=0,margin_y=0){
    ctx.current.lineJoin= 'round';
    ctx.current.beginPath();
    ctx.current.lineWidth=size;//
    ctx.current.strokeStyle=selectedColor;
    ctx.current.moveTo(last.x+margin_x,last.y+margin_y+(y-last.y)/2);
    ctx.current.bezierCurveTo(last.x+margin_x, last.y+margin_y, x+margin_x,last.y+margin_y,x+margin_x,last.y+margin_y+(y-last.y)/2);
    ctx.current.bezierCurveTo(x+margin_x,y+margin_y,last.x+margin_x,y+margin_y,last.x+margin_x,last.y+margin_y+(y-last.y)/2);
    ctx.current.closePath();
    ctx.current.stroke();
}
export function drawRectangle(ctx,selectedColor,size,last,x,y,margin_x=0,margin_y=0){
    ctx.current.lineJoin='round';
    ctx.current.beginPath();
    ctx.current.lineWidth=size;//
    ctx.current.strokeStyle=selectedColor;
    moveTo(ctx.current,last.x+margin_x,last.y+margin_y);
    lineTo(ctx.current,last.x+margin_x,y+margin_y);
    lineTo(ctx.current,x+margin_x,y+margin_y);
    lineTo(ctx.current,x+margin_x,last.y+margin_y);
    lineTo(ctx.current,last.x+margin_x,last.y+margin_y);
    ctx.current.closePath();
    ctx.current.stroke();
}
export function drawLine(ctx,selectedColor,size,last,x,y,margin_x=0,margin_y=0){
    ctx.current.lineJoin='round';
    ctx.current.beginPath();
    ctx.current.lineWidth=size;//
    ctx.current.strokeStyle=selectedColor;
    ctx.current.moveTo(last.x+margin_x,last.y+margin_y);
    ctx.current.lineTo(x+margin_x,y+margin_y);
    ctx.current.closePath();
    ctx.current.stroke();
}
//add margin to everything, then styling can becoming easier
export function Pen(ctx,selectedColor,size,last,x,y,margin_x=0,margin_y=0,scale=1){
    ctx.current.beginPath();
    ctx.current.strokeStyle=selectedColor;
    ctx.current.lineWidth=size*scale;// use state ti modify size 
    ctx.current.lineCap='round';
    ctx.current.lineJoin= 'round';
    ctx.current.moveTo(last.x+margin_x, margin_y+last.y);
    ctx.current.lineTo(x+margin_x,margin_y+y);
    ctx.current.closePath();
    ctx.current.stroke();
}
export function Eraser(ctx,selectedColor,size,last,x,y,margin_x=0,margin_y=0,scale=1){
    // ctx.current.lineWidth=size*scale;// use state ti modify size 
    ctx.current.lineCap='round';
    ctx.current.lineJoin= 'round';
    ctx.current.clearRect(x+margin_x,margin_y+y, size*scale, size*scale)
}