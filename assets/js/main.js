// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function handleCellClick(cellIndex) {
    const row = Math.floor(cellIndex / gridSize);
    const col = cellIndex % gridSize;
    
    // Game logic
    const moveSuccessful = playTurn(row, col);
    
    // Update UI
    if (moveSuccessful) {
        updateBoard();
        updateStatus();
    }
}

// Restart button
function handleRestartClick() {
    // Game logic
    restartGame();
    
    // Update UI
    generateGameBoard(gridSize);
    setupCellListeners();
    updateBoard();
    updateStatus();
}

// Grid size change
function handleGridSizeChange() {
    const input = document.getElementById('grid-size-input');
    const newSize = parseInt(input.value);
    
    if (resizeBoard(newSize)) {
        generateGameBoard(gridSize);
        setupCellListeners();
        updateBoard();
        updateStatus();
    }
}

// Setup event listeners for all cells
function setupCellListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            handleCellClick(index);
        });
    });
}

function initializeGame() {
    // Load saved game state if available
    const stateLoaded = loadGameState();
    
    // Generate board based on current grid size
    generateGameBoard(gridSize);
    
    // Setup event listeners
    setupCellListeners();
    
    // Add restart button event listener
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', handleRestartClick);
    
    // Add grid size change event listener
    const applySizeBtn = document.getElementById('apply-size-btn');
    applySizeBtn.addEventListener('click', handleGridSizeChange);
    
    // Update grid size input to match current size
    const gridSizeInput = document.getElementById('grid-size-input');
    gridSizeInput.value = gridSize;
    
    // Update display
    updateBoard();
    updateStatus();
}
