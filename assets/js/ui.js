// UI functions / DOM manipulation.

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cellIndex = i * gridSize + j;
            if (cells[cellIndex]) {
                const cellValue = board[i][j];
                cells[cellIndex].textContent = cellValue;
                
                // Remove previous classes
                cells[cellIndex].classList.remove('cell-x', 'cell-o');
                
                // Add appropriate class based on cell value
                if (cellValue === 'X') {
                    cells[cellIndex].classList.add('cell-x');
                } else if (cellValue === 'O') {
                    cells[cellIndex].classList.add('cell-o');
                }
            }
        }
    }
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    const symbols = getPlayerSymbols();
    
    // Show whose turn it is
    if (currentPlayer === symbols.player) {
        statusElement.textContent = `Votre tour (${symbols.player})`;
    } else {
        statusElement.textContent = `Tour de l'adversaire (${symbols.computer})`;
    }
}

function generateGameBoard(size) {
    const gameBoard = document.getElementById('game-board');
    
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        gameBoard.appendChild(cell);
    }
    
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 100px)`;
}
