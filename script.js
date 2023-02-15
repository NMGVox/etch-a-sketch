//TODO remove all child nodes from .square container *Done
//Add color picker *Done
//Make a clear button
//Shade functionality *Kinda Done?
//Bonus: Make app behave like a brush instead of only mouseover. (push and drag to draw)
//

let gridsize = 16;
let grid_arr = [];
let rainbow_arr = [];
let rainbow = false;
let eraser = false;
let shader = false;
let pen = false;
let container = document.querySelector('.square-container');

let toggleShader = () =>{
    shader = !shader;
    if(rainbow){rainbow = false;}
    console.log(shader);
    return;
}

let toggleEraser = () =>{
    eraser = !eraser;
    console.log(eraser);
    return;
}

let disablePen = () => {
    pen = false;
    console.log(pen);
    return;
}

let activatePen = () => {
    pen = true;
    console.log(pen);
    return;
}

let toggleRainbow = () =>{
    rainbow = !rainbow;
    if(rainbow){
        if(shader) {shader = false;}
        rainbow_arr = ["red", "blue", "yellow", "purple", "green", "orange", "indigo", "turquoise"];
        return;
    }
    rainbow_arr = [];
    return;
}

function fill(e){
    //console.log(this.style.backgroundColor.substr(0, 14));
    if(pen){
        if(eraser){
            this.classList.remove("fill");
            this.style.backgroundColor = "white";
            return;
        }
        //this.classList.add("fill")
        if(shader){
            if(this.style.backgroundColor.substr(this.style.backgroundColor.indexOf("("), 8) == "(0, 0, 0"){
                let alpha = +(this.style.backgroundColor.substring(14, this.style.backgroundColor.length-1));
                console.log(alpha);
                if(alpha !== 1){
                    this.style.backgroundColor = `rgba(0, 0, 0, ${alpha + 0.1})`;
                    return;
                }
                console.log("?");
            }
            else{
                this.style.backgroundColor = `rgba(0, 0, 0, .1)`;
            }
            return;
        }
        if(rainbow){
            //this.style.backgroundColor = "#" + Math.floor(Math.random()*0xFFFFFF).toString(16);
            this.style.backgroundColor = rainbow_arr[Math.floor(Math.random() * 8)];
            return;
        }
        this.style.backgroundColor = brush;
    }
    return;
}

function changeGridSize(e){
    let slider_label = document.querySelector("#slider-label");
    slider_label.textContent = `${this.value} x ${this.value}`;
    gridsize = this.value;
    return;
}

function changeColor(e){
    brush = this.value;
    return;
}

//I have to remove all child nodes from .square-container. 2-14-2023
function removeAllSquares(p){
    let child = p.firstElementChild;
    while(child){
        p.removeChild(child)
        child = p.firstElementChild;
    }
    return;
}

function initializeGrid(){
    console.log("Fish!");
    grid_arr = [];
    for(let i = 0; i < gridsize * gridsize; i++){
        grid_arr.push(document.createElement('div'));
        grid_arr[i].classList.add("paint-square");
        grid_arr[i].value = i;
    }
    
    removeAllSquares(container);
    let dimension = 600/gridsize;
    grid_arr.forEach(element => {
        element.style.height=`${dimension}px`;
        element.style.width=`${dimension}px`;
        container.appendChild(element);
    });

    grid_arr.forEach(box => {
        box.addEventListener('mouseover', fill);
    })
    return;
}


initializeGrid();

container.addEventListener('mousedown', activatePen); 
window.addEventListener('mouseup', disablePen);

let grid_slider = document.querySelector(".grid-slider");
grid_slider.addEventListener("input", changeGridSize);

let apply_btn = document.querySelector("#grid-change");
apply_btn.addEventListener('click', initializeGrid);

let color_picker = document.querySelector("#color-picker");
let brush = color_picker.value;
color_picker.addEventListener("change", changeColor);

let rainbtn = document.querySelector("#rainbtn");
rainbtn.addEventListener('click', toggleRainbow);

let erasebtn = document.querySelector("#eraser");
erasebtn.addEventListener('click', toggleEraser);

let shaderbtn = document.querySelector("#shader");
shaderbtn.addEventListener('click', toggleShader);

let clearbtn = document.querySelector("#clear");
clearbtn.addEventListener('click', initializeGrid);


