// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Game initialized!");
    initializeGame();
});

function initializeGame() {
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            handleCellClick(index);
        });
    });
    
    updateBoard();
    updateStatus();
}
