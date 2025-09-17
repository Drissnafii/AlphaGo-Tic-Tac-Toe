// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Game initialized!");
    initializeGame();
});

// Bridge function between UI events and game logic
function handleCellClick(cellIndex) {
    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;
    
    // Call pure game logic
    const moveSuccessful = playTurn(row, col);
    
    // Update UI if move was successful
    if (moveSuccessful) {
        updateBoard();
        updateStatus();
    }
}

// Bridge function for restart button
function handleRestartClick() {
    // Call pure game logic
    restartGame();
    
    // Update UI
    updateBoard();
    updateStatus();
}

function initializeGame() {
    // Load saved game state if available
    const stateLoaded = loadGameState();
    
    const cells = document.querySelectorAll('.cell');
    
    // Add click event listeners to all cells
    cells.forEach((cell, index) => {
        console.log(cell);
        console.log(index);
        cell.addEventListener('click', function() {
            handleCellClick(index);
        });
    });
    
    // Add restart button event listener
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', handleRestartClick);
    
    // Update display+status
    updateBoard();
    updateStatus();
    
    if (stateLoaded) {
        console.log("Game resumed from saved state");
    } else {
        console.log("Starting new game");
    }
}
