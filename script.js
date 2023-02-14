let gridsize = 16;
let grid_arr = [];

function fill(e){
    console.log(this.value);
}

for(let i = 0; i < 16 * 16; i++){
    grid_arr.push(document.createElement('div'));
    grid_arr[i].classList.add("paint-square");
    grid_arr[i].value = i;
}

let container = document.querySelector('.container');
grid_arr.forEach(element => {
    container.appendChild(element);
});


grid_arr.forEach(box => {
    box.addEventListener('mouseover', fill);
})