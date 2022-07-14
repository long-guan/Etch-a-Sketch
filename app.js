const gridSize = document.querySelector("#gridSize");
const gridSizeDisplay = document.querySelector("#gridSizeDisplay");
const gridContainer = document.querySelector("#gridContainer");
let previousGridSize = 0;
const squareStyle = document.querySelector("#square-style");
let mouseDown = false;
const backgroundColor = document.querySelector("#background-color");
const rainbowMode = document.querySelector("#rainbow");
let plurMode = false;
const gradient = document.querySelector("#gradient");
let gradientMode = false;

// toggles gradient on or off
rainbowMode.addEventListener('click', function() {
    if (plurMode == false) {
        plurMode = true;
        console.log("plurMode is true");
    } else {
        plurMode = false;
        console.log("plurMode is false");
    }
})

// toggles gradient on or off
gradient.addEventListener('click', function() {
    if (gradientMode == false) {
        gradientMode = true;
        console.log("gradientMode is true")
    } else {
        gradientMode = false;
        console.log("gradientMode is false")
    }
})

// initializes the grid
createGrid(gridSize.value);

// sets initial default grid size
gridSizeDisplay.innerText = `${gridSize.value}x${gridSize.value}`;

// updates the grid selector input as it scrolls, used directly in HTML
function showGrid(newVal) {
    gridSizeDisplay.innerHTML = `${newVal}x${newVal}`;
}

// Resizes drawing board based on gridSize. Drawing board is 500px.
function reSizeSquare(square, gridSize) {
    square.style.width = 500/gridSize + "px";
    square.style.height = 500/gridSize + "px";
}

// creates row of divs based on gridsize, styling is set to wrap and each div is sized width and height wise to fit the row and columns.
function createGrid(gridSize) {
    previousGridSize = gridSize;
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize; j++) {
            let square = document.createElement("div");
            square.classList.add("square-style");
            reSizeSquare(square, gridSize);
            addEventListener(square);
            gridContainer.appendChild(square);
        }
    }
}

// delete all the previously created divs (squares) from the grid
function deleteGrid(gridContainer) {
    for (let i = 1; i <= previousGridSize; i++) {
        for (let j = 1; j <= previousGridSize; j++) {
            gridContainer.removeChild(gridContainer.firstElementChild);
        }
    }
}

// returns random rgb(num, num, num)
function createRandColor() {
    return "rgb" + "(" + Math.round(Math.random()*1000) + ", " + Math.round(Math.random()*1000) + ", " + Math.round(Math.random()*1000) + ")";
}

// returns what color the background of the div (square) will be
function chooseColorMode(square) {
    if (plurMode == true) {
        return createRandColor();
    } else if (gradientMode == true) {
        increaseOpacity(square);
        return backgroundColor.value;
    } else {
        return backgroundColor.value;
    }
}


function addEventListener(square) {
    if (gradientMode == true) {
        console.log("gradient")
        square.addEventListener('mousedown', function() {
            square.style.backgroundColor = chooseColorMode(square);
            mouseDown = true;
        })
        square.addEventListener('mouseup', function() {
            mouseDown = false;
        })
        square.addEventListener('mouseenter', function() {
            if (mouseDown == true) {
                square.style.backgroundColor = chooseColorMode(square);
            }
        })
    } else { // rainbow mode and normal mode
        console.log("non gradient");
        square.addEventListener('mousedown', function() {
            square.style.backgroundColor = chooseColorMode(square);
            mouseDown = true;
        }, {once: true})
        square.addEventListener('mouseup', function() {
            mouseDown = false;
        })
        square.addEventListener('mouseenter', function() {
            if (mouseDown == true) {
                square.style.backgroundColor = chooseColorMode(square);
            }
        }, {once: true})
    }
}

// adds 0.1 to the div's opacity
function increaseOpacity(square) {
    if (square.style.opacity == "") {
        console.log("test");
        square.style.opacity = 0.1;
    } else {
        square.style.opacity += 0.1;
    }
}

// deletes and creates new grid everytime the grid size changes
gridSize.addEventListener("change", function() {
    deleteGrid(gridContainer);
    createGrid(gridSize.value);
})
