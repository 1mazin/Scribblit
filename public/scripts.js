let optionsCont=document.querySelector(".options-cont");
let toolsCont=document.querySelector(".tools")
let optionFlag=true;//tool box open hai
let pencilCont=document.querySelector(".pencil-cont");
let eraserCont=document.querySelector(".eraser-cont")
let pencil=document.querySelector(".pencil");
let eraser=document.querySelector(".eraser")
let sticky=document.querySelector(".sticky");
let upload=document.querySelector(".upload");
let pencilFlag=false;
let eraserFlag=false;

optionsCont.addEventListener("click",(e)=>{
    optionFlag=!optionFlag;
    if(optionFlag)openTools();
    else closeTools();
})


function openTools(){
    let iconElement=optionsCont.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolsCont.style.display="flex";
}
function closeTools(){
    let iconElement=optionsCont.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolsCont.style.display="none";

    pencilCont.style.display="none";
    eraserCont.style.display="none"
}


pencil.addEventListener("click",(e)=>{
    pencilFlag=!pencilFlag;
    if(pencilFlag) {
        pencilCont.style.display="block";
    }
    else {
        pencilCont.style.display="none";
    };
})
eraser.addEventListener("click",(e) => {
    eraserFlag=!eraserFlag;
    if(eraserFlag) {
        eraserCont.style.display="block";
    }
    else {
        eraserCont.style.display="none";
    }

});

sticky.addEventListener("click",(e)=>{

    let stickytemplateHTML=`
    <div class="headers-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `
    createSticky(stickytemplateHTML)
    
        // (1) prepare to moving: make absolute and on top by z-index
     
})

upload.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let file=input.files[0];
        let url=URL.createObjectURL(file);

        let stickytemplateHTML=`
        <div class="headers-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src=${url}/>
        </div>
    
        `
        createSticky(stickytemplateHTML)
    })

    
})
function createSticky(stickytemplateHTML)
{
    let stickyCont=document.createElement("div");
    
    stickyCont.setAttribute("class","sticky-notes");
    stickyCont.innerHTML=stickytemplateHTML
    document.body.appendChild(stickyCont)
    let minimize=stickyCont.querySelector(".minimize");
    let remove=stickyCont.querySelector(".remove");

    noteActions(minimize,remove,stickyCont)
    stickyCont.onmousedown = function(event){
        draganddrop(stickyCont,event)
    }
    stickyCont.ondragstart = function() {
       return false;
        };
}


function noteActions(minimize,remove,stickyCont){
    remove.addEventListener("click",(e)=>{
        stickyCont.remove();
    })
    minimize.addEventListener("click",(e)=>{
        let noteContainer=stickyCont.querySelector(".note-cont");
        let display=getComputedStyle(noteContainer).getPropertyValue("display");
        console.log(display);
        if (display === "block") noteContainer.style.display = "none";
        else noteContainer.style.display = "block";
    })
}


function draganddrop(element,event){
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        //document.body.append(element);
        moveAt(event.pageX, event.pageY);
      
        // moves the element at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          element.style.left = pageX - shiftX + 'px';
          element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the element on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the element, remove unneeded handlers
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
      
      };
      
    

