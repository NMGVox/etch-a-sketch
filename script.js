//TODO remove all child nodes from .square container *Done
//Add color picker *Done
//Make a clear button
//Shade functionality *Kinda Done?
//Bonus: Make app behave like a brush instead of only mouseover. (push and drag to draw)
//

let gridsize = 16;
let grid_arr = [];
let rainbow_arr = ["red", "blue", "yellow", "purple", "green", "orange", "indigo"];
let rainbow = false;
let eraser = false;
let shader = false;
let dodge = false;
let pen = false;
let container = document.querySelector('.square-container');

let toggleDodge = () =>{
    dodge = !dodge;
    if(dodge){
        if(rainbow || shader){
            rainbow = false;
            shader = false;
            rainbtn.classList.remove("active");
            shaderbtn.classList.remove("active");
        }
        dodgebtn.classList.add("active");
    }
    else{
        dodgebtn.classList.remove("active");
    }
};

let toggleShader = () =>{
    shader = !shader;    
    if(shader){
        if(rainbow || dodge) {
            rainbow = false;
            dodge = false;
            rainbtn.classList.remove("active");
            dodgebtn.classList.remove("active");
        }
        shaderbtn.classList.add("active");
    } 
    else{
        shaderbtn.classList.remove("active");
    }
    return;
};

let toggleRainbow = () =>{
    rainbow = !rainbow;
    if(rainbow){
        if(shader || dodge) {
            shader = false;
            dodge = false;
            shaderbtn.classList.remove("active");
            dodgebtn.classList.remove("active");
        }
        rainbtn.classList.add("active");
        return;
    }
    rainbtn.classList.remove("active")
    rainbow_arr = [];
    return;
};

let toggleEraser = () =>{
    eraser = !eraser;
    if(eraser){
        erasebtn.classList.add("active");
    }
    else {erasebtn.classList.remove("active");}
    return;
};

let disablePen = () => {
    pen = false;
    return;
};

let activatePen = () => {
    pen = true;
    return;
};

function lighten(c){
    let rgb_arr = c.match(/\d+/g).map(Number);
    for(let i = 0; i < rgb_arr.length; i++){
        if(rgb_arr[i] < 255){
            rgb_arr[i] += Math.floor(255 * .10); 
        }
        rgb_arr[i] > 255 ? rgb_arr[i] = 255: rgb_arr[i] = rgb_arr[i];
    }
    console.log(rgb_arr);
    return(`rgb(${rgb_arr[0]}, ${rgb_arr[1]}, ${rgb_arr[2]})`);
}

function darken(c){
    let rgb_arr = c.match(/\d+/g).map(Number);
    for(let i = 0; i < rgb_arr.length; i++){
        if(rgb_arr[i] > 0){
            rgb_arr[i] -= Math.floor(255 * .10); 
        }
        rgb_arr[i] < 0 ? rgb_arr[i] = 0: rgb_arr[i] = rgb_arr[i];
    }
    return(`rgb(${rgb_arr[0]}, ${rgb_arr[1]}, ${rgb_arr[2]})`);
}

function fill(e){
    if(pen){
        e.preventDefault();
        if(eraser){
            this.classList.remove("fill");
            this.style.backgroundColor = "rgb(255, 255, 255)";
            return;
        }
        if(dodge){
            temp_col = getComputedStyle(this).getPropertyValue("background-color");
            this.style.backgroundColor = lighten(temp_col);
            return;
        }
        if(shader){
            temp_col = getComputedStyle(this).getPropertyValue("background-color");
            this.style.backgroundColor = darken(temp_col);
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
        box.addEventListener('mousedown', fill);
        box.addEventListener('mouseover', fill);
    });
    return;
}


initializeGrid();

container.addEventListener('mousedown', activatePen, true); 
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

let dodgebtn = document.querySelector("#dodge");
dodgebtn.addEventListener('click', toggleDodge);

let clearbtn = document.querySelector("#clear");
clearbtn.addEventListener('click', initializeGrid);


