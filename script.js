//TODO remove all child nodes from .square container *Done
//Add color picker
//Make a clear button
//Shade functionality
//Bonus: Make app behave like a brush instead of only mouseover. (push and drag to draw)

let gridsize = 16;
let grid_arr = [];
let rainbow = false;

let toggleRainbow = () =>{
    rainbow = !rainbow;
    console.log(rainbow);
}

function fill(e){
    this.classList.add("fill")
    if(rainbow){
        this.style.backgroundColor = "#" + Math.floor(Math.random()*0xFFFFFF).toString(16);
        return;
    }
    this.style.backgroundColor = brush;
}

function changeGridSize(e){
    let slider_label = document.querySelector("#slider-label");
    slider_label.textContent = `${this.value} x ${this.value}`;
    gridsize = this.value;
}

function changeColor(e){
    brush = this.value;
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
    console.log("Fish");
    grid_arr = [];
    for(let i = 0; i < gridsize * gridsize; i++){
        grid_arr.push(document.createElement('div'));
        grid_arr[i].classList.add("paint-square");
        grid_arr[i].value = i;
    }
    let container = document.querySelector('.square-container');
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

}


initializeGrid();



let grid_slider = document.querySelector(".grid-slider");
grid_slider.addEventListener("input", changeGridSize);

let apply_btn = document.querySelector("#grid-change");
apply_btn.addEventListener('click', initializeGrid);

let color_picker = document.querySelector("#color-picker");
let brush = color_picker.value;
color_picker.addEventListener("change", changeColor);

let rainbtn = document.querySelector("#rainbtn");
rainbtn.addEventListener('click', toggleRainbow);

