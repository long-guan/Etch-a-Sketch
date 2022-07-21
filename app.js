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
        rainbowMode.style.backgroundColor = "gray";
        gradientMode = false;
        gradient.style.backgroundColor = "";
        addEventListForDefaultMode()
        console.log("rainbowMode is true");
    } else {
        plurMode = false;
        rainbowMode.style.backgroundColor = "";
        console.log("rainbowMode is false");
    }
})

// toggles gradient on or off
gradient.addEventListener('click', function() {
    if (gradientMode == false) {
    // removes eventlisteners for default mode and add for gradient mode
        gradientMode = true;
        gradient.style.backgroundColor = "gray";
        plurMode = false;
        rainbowMode.style.backgroundColor = "";
        addEventListForGradientMode();
        console.log("gradientMode is true")
    } else {
    // removes eventlistener for gradient mode and for default mode
        gradientMode = false;
        gradient.style.backgroundColor = "";
        addEventListForDefaultMode()
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

function addEventListener(square) {
    if (gradientMode == true) {
        console.log("gradient")
        square.addEventListener('mousedown', paint1ClickGrad)
        square.addEventListener('mouseup', function() {
            mouseDown = false;
        })
        square.addEventListener('mouseenter', paintMouseDownGrad)
    } else { // rainbow mode and normal mode
        console.log("non gradient");
        square.addEventListener('mousedown', paint1ClickDefault, {once: true})
        square.addEventListener('mouseup', function() {
            mouseDown = false;
        })
        square.addEventListener('mouseenter', paintMouseDownDefault, {once: true})
    }
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
        console.log("rainbow mode");
        return createRandColor();
    } else if (gradientMode == true) {
        increaseOpacity(square);
        console.log('increaseOpacity');
        return backgroundColor.value;
    } else {
        console.log("default mode");
        return backgroundColor.value;
    }
}

// mousedown => increase opacity by 0.1
function paint1ClickGrad() {
    this.style.backgroundColor = chooseColorMode(this);
    mouseDown = true;
}

// mousedown around divs => increase opacity by 0.1
function paintMouseDownGrad() {
    if (mouseDown == true) {
        this.style.backgroundColor = chooseColorMode(this);
    }
}

// for default or rainbow mode
function paint1ClickDefault() {
    this.style.backgroundColor = chooseColorMode(this);
    mouseDown = true;
}

// for default or rainbow mode
function paintMouseDownDefault() {
    if (mouseDown == true) {
        this.style.backgroundColor = chooseColorMode(this);
    }
}

// adds 0.1 to the div's opacity, removes event listener when opacity reaches 1
function increaseOpacity(square) {
    if (square.style.opacity == "") {
        console.log("set opacity to 0.1");
        square.style.opacity = 0.1;
    } else {
        console.log(square.style.opacity);
        square.style.opacity = parseFloat(square.style.opacity) + 0.1;
        console.log('increase opacity by 0.1');
        if (square.style.opacity == 1) {
            square.removeEventListener('mousedown', paint1ClickGrad);
            square.removeEventListener('mouseenter', paintMouseDownGrad);
        }
    }
}

// removes eventlistener for divs that didn't have its eventlistener triggered in default mode
function removeEventListForDefault(square) {
    if (square.style.opacity == "") {
        square.removeEventListener('mousedown', paint1ClickDefault);
        square.removeEventListener('mouseenter', paintMouseDownDefault);
    }
}

// removes all eventlistener for divs in gradient mode
function removeEventListForGrad(square) {
    square.removeEventListener('mousedown', paint1ClickGrad);
    square.removeEventListener('mouseenter', paintMouseDownGrad);
}

// add eventlistener for gradient mode for divs hasn't been painted or for divs that hasn't reached full opacity
function checkBeforeAddEventListForGrad(square) {
    if (square.style.backgroundColor == "") {
        addEventListener(square);
    } else if (square.style.opacity > 0 && square.style.opacity < 1) {
        addEventListener(square);
    }
}

// add eventlistener for default mode for divs hasn't been painted
function checkBeforeAddEventListForDefault(square) {
    if (square.style.opacity == "") {
        addEventListener(square);
    }
}

// when switching from default mode to gradient mode, check each div to see if the default eventlistener was activated, if not remove the one-occurence event and add the gradient mode event to the div
function addEventListForGradientMode() {
    let squareList = document.querySelectorAll(".square-style");
    for (let i = 0; i < squareList.length; i++) {
        let square = squareList[i]
        removeEventListForDefault(square);
        checkBeforeAddEventListForGrad(square);
    }
}

// when switching from gradient mode to default mode, remove all eventlisteners for gradient mode and add eventlistener for default mode
function addEventListForDefaultMode() {
    let squareList = document.querySelectorAll(".square-style");
    for (let i = 0; i < squareList.length; i++) {
        let square = squareList[i]
        removeEventListForGrad(square);
        checkBeforeAddEventListForDefault(square);
    }
}

// deletes and creates new grid everytime the grid size changes
gridSize.addEventListener("change", function() {
    deleteGrid(gridContainer);
    createGrid(gridSize.value);
})
