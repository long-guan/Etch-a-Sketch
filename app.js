const gridSize = document.querySelector("#gridSize");
const gridSizeDisplay = document.querySelector("#gridSizeDisplay");
const gridContainer = document.querySelector("#gridContainer");
let previousGridSize = 0;

createGrid(gridSize.value);

gridSizeDisplay.innerText = `${gridSize.value}x${gridSize.value}`;

// updates the grid selector input as it scrolls, used directly in HTML
function showGrid(newVal) {
    gridSizeDisplay.innerHTML = `${newVal}x${newVal}`;
}

function createGrid(gridSize) {
    previousGridSize = gridSize;
    for (let i = 1; i <= gridSize; i++) {
        console.log(`createGrid${i}`);
        let square = document.createElement("div");
        let text = document.createTextNode(`${i}`);
        square.appendChild(text);
        gridContainer.appendChild(square);
    }
}

function deleteGrid(gridContainer) {
    for (let i = 1; i <= previousGridSize; i++) {
        console.log(`deleteGrid${i}`);
        gridContainer.removeChild(gridContainer.firstElementChild);
    }
}

gridSize.addEventListener("change", function() {
    deleteGrid(gridContainer);
    createGrid(gridSize.value);
})
