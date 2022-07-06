const gridSize = document.querySelector("#gridSize");
const gridSizeDisplay = document.querySelector("#gridSizeDisplay");

gridSizeDisplay.innerText = `${gridSize.value}x${gridSize.value}`;


gridSize.addEventListener("change", function() {
    console.log(gridSize.value);
    gridSizeDisplay.innerText = `${gridSize.value}x${gridSize.value}`;
})
