//const { Socket } = require("engine.io");

const canvas=document.querySelector("canvas")
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let pencilColor=document.querySelectorAll(".pencil-color");
let pencilWidthElem=document.querySelector(".pencil-width");
let eraserWidthElem=document.querySelector(".eraser-width");
let download=document.querySelector(".download");
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");

let penColor="red";
let eraserColor="white";
let penWidth=pencilWidthElem.value;
let eraserWidth=eraserWidthElem.value;

let undoRedoTracker=[];
let currentTrack=0;


const ctx = canvas.getContext("2d");


ctx.strokeStyle=penColor
ctx.lineWidth=penWidth
let mouseDown=false;
//mouse down -> start path,mouse move-> pah ko fill kardo,mouse up 

canvas.addEventListener("mousedown", (e)=>{
    mouseDown=true;
    let data={
       x:e.clientX,
       y:e.clientY
    }
    socket.emit("beginPath",data);
    

})
canvas.addEventListener("mousemove",(e)=>{

    if(mouseDown){
        let data={
            x:e.clientX,
            y:e.clientY,
            color:eraserFlag?eraserColor:penColor,
            width:eraserFlag?eraserWidth:penWidth
    
        }
        socket.emit("drawstroke",data)

    }

})
canvas.addEventListener("mouseup",(e)=>{
    mouseDown=false;
    let url=canvas.toDataURL();
    undoRedoTracker.push(url);
    track=undoRedoTracker.length-1;

})

undo.addEventListener("click",(e)=>{
    if(track>0) track--;
      let data={
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("undoRedo",data);
    //undoRedo(trackObj);
})
redo.addEventListener("click",(e)=>{
    if(track<undoRedoTracker.length-1) track++;
    let data={
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("undoRedo",data);
})

function undoRedo(Obj) {
    let tracknum=Obj.trackValue;
    let arr=Obj.undoRedoTracker;
    let url=arr[tracknum];
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    }

}
function beginPath(strokeOb){
    ctx.beginPath();
    ctx.moveTo(strokeOb.x, strokeOb.y);
}
function drawstroke(strokeOb){
    ctx.strokeStyle=strokeOb.color;
    ctx.lineWidth=strokeOb.width;
    ctx.lineTo(strokeOb.x,strokeOb.y);
    ctx.stroke();

}
pencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let color=colorElem.classList[0];
        penColor=color;
        ctx.strokeStyle=penColor;
    })
})

pencilWidthElem.addEventListener("change",(e)=>{
    penWidth=pencilWidthElem.value;
    ctx.lineWidth=penWidth;
})
eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth=eraserWidthElem.value;
    ctx.lineWidth=eraserWidth;

})
eraser.addEventListener("click",(e)=>{
    if(eraserFlag){
        ctx.strokeStyle=eraserColor;
        ctx.lineWidth=eraserWidth;
    }
    else{
        ctx.strokeStyle=penColor;
        ctx.lineWidth=penWidth;
    }
})

download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})


socket.on("beginPath",(data)=>{
    //data =>data from server
    beginPath(data);
})
socket.on("drawstroke",(data)=>{
    //data =>data from server
    drawstroke(data);
})
socket.on("undoRedo",(data)=>{
    //data =>data from server
    undoRedo(data);
})