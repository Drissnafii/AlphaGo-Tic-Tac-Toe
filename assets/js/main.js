// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Game initialized!");
    initializeGame();
});

function initializeGame() {
    const stateLoaded = loadGameState();
    
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            handleCellClick(index);
        });
    });
    
    // Update display+status
    updateBoard();
    updateStatus();
    
    if (stateLoaded) {
        console.log("Game resumed from saved state");
    } else {
        console.log("Starting new game");
    }
}
