const gridSize = document.querySelector("#gridSize");
const gridSizeDisplay = document.querySelector("#gridSizeDisplay");
const gridContainer = document.querySelector("#gridContainer");
let previousGridSize = 0;
const squareStyle = document.querySelector("#square-style");


// initializes the grid
createGrid(gridSize.value);

gridSizeDisplay.innerText = `${gridSize.value}x${gridSize.value}`;

// updates the grid selector input as it scrolls, used directly in HTML
function showGrid(newVal) {
    gridSizeDisplay.innerHTML = `${newVal}x${newVal}`;
}


function createGrid(gridSize) {
    previousGridSize = gridSize;
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize; j++) {
            let square = document.createElement("div");
            let text = document.createTextNode(`${i}`);
            square.appendChild(text);
            square.classList.add("square-style");
            let squareStyle = document.querySelector("square-style");
            square.style.width = 500/gridSize + "px";
            square.style.height = 500/gridSize + "px";
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

gridSize.addEventListener("change", function() {
    deleteGrid(gridContainer);
    createGrid(gridSize.value);
    gridWidthHeight = 1000/gridSize.value;
})
