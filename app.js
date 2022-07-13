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

rainbowMode.addEventListener('click', function() {
    if (plurMode == false) {
        plurMode = true;
    } else {
        plurMode = false;
    }
})

gradient.addEventListener('click', function() {
    if (gradientMode == false) {
        gradientMode = true;
    } else {
        gradientMode = false;
    }
})

// initializes the grid
createGrid(gridSize.value);

gridSizeDisplay.innerText = `${gridSize.value}x${gridSize.value}`;

// updates the grid selector input as it scrolls, used directly in HTML
function showGrid(newVal) {
    gridSizeDisplay.innerHTML = `${newVal}x${newVal}`;
}


function reSizeSquare(square, gridSize) {
    square.style.width = 500/gridSize + "px";
    square.style.height = 500/gridSize + "px";
}


function createGrid(gridSize) {
    previousGridSize = gridSize;
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize; j++) {
            let square = document.createElement("div");
            // let text = document.createTextNode(`${i}`);
            // square.appendChild(text);
            square.classList.add("square-style");
            reSizeSquare(square, gridSize);
            addEventListener(square);
            gridContainer.appendChild(square);
        }
    }
}

function deleteGrid(gridContainer) {
    for (let i = 1; i <= previousGridSize; i++) {
        for (let j = 1; j <= previousGridSize; j++) {
            gridContainer.removeChild(gridContainer.firstElementChild);
        }
    }
}

function createRandColor() {
    return "rgb" + "(" + Math.round(Math.random()*1000) + ", " + Math.round(Math.random()*1000) + ", " + Math.round(Math.random()*1000) + ")";
}

function chooseColorMode() {
    if (plurMode == true) {
        return createRandColor();
    } else {
        return backgroundColor.value;
    }
}

function addEventListener(square) {
    square.addEventListener('mousedown', function() {
        square.style.backgroundColor = chooseColorMode();
        mouseDown = true;
    }, {once: true})
    square.addEventListener('mouseup', function() {
        mouseDown = false;
    })
    square.addEventListener('mouseenter', function() {
        if (mouseDown == true) {
            square.style.backgroundColor = chooseColorMode();
        }
    }, {once: true})
}

function increaseOpacity() {

}

gridSize.addEventListener("change", function() {
    deleteGrid(gridContainer);
    createGrid(gridSize.value);
})
