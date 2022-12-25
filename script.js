let currentModeColor = 0;

const btnPickColor = document.querySelector(".pick-color");
const btnRainbow = document.querySelector(".btn-rainbow");
const btnReset = document.querySelector(".btn-reset");

const gridContainer = document.querySelector(".grid-container");

const showGridSize = document.querySelector(".show-grid-size");
const chooseRange = document.querySelector(".range");

const divBottomLeft = document.querySelector(".div-bottom-left");
const divBottomRight = document.querySelector(".div-bottom-right");

const rotateLeft = document.querySelector(".img-rotate-left");
const rotateRight = document.querySelector(".img-rotate-right");

let rotateLeftValue = 0;

rotateLeft.addEventListener("click", function(e) {
    rotateLeftValue--;
    divBottomLeft.style.transform = "rotate(" + rotateLeftValue + "deg)";
});

rotateRight.addEventListener("click", function(e) {
    rotateLeftValue++;
    divBottomLeft.style.transform = "rotate(" + rotateLeftValue + "deg)";
});

//On each call, generates a random color.
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    btnRainbow.style.backgroundColor = color;
    return color;
}


//On each mouseover, adds a cell at the mouse position with the choosen color.
function makeGrid(size) {
    let color;
    gridContainer.style.setProperty('--grid-rows', size);
    gridContainer.style.setProperty('--grid-cols', size);
    for(let i = 0; i < (size * size); i++) {
        let cell = document.createElement("div");
        cell.classList.add("grid-item");
        gridContainer.appendChild(cell);
        cell.addEventListener("mouseover", () => {
            if(currentModeColor === 0) {
                color = btnPickColor.value;
            } else {
               color = getRandomColor();
            }
            cell.style.backgroundColor = color;
            cell.style.border = "1px solid black";
        });
    }
}

//At each call, cleans the screen, restores default colors and texts. 
function clearGrid() {
    gridContainer.innerHTML = '';
    currentModeColor = 0;
    btnPickColor.value = "black";
    btnPickColor.style.backgroundColor = "orange";
    btnRainbow.style.backgroundColor = "orange";
    showGridSize.textContent = chooseRange.value + " x " + chooseRange.value;
    makeGrid(chooseRange.value);
}

btnPickColor.addEventListener("input", () => {
    currentModeColor = 0;
    btnPickColor.style.backgroundColor = btnPickColor.value;
    btnRainbow.style.backgroundColor = "orange";
});

btnRainbow.addEventListener("click", () => {
    currentModeColor = 1;
});

btnReset.addEventListener("click", () => {
    clearGrid();
});

chooseRange.addEventListener("change", function(e) {
    clearGrid();
});

clearGrid();