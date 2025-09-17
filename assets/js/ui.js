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
    const gameStatus = getGameStatus();
    const k = getKAlignment();
    
    // Check if game is won
    if (gameStatus.gameWon) {
        if (gameStatus.winner === symbols.player1) {
            statusElement.textContent = `🎉 Joueur 1 (${gameStatus.winner}) gagne! 🎉`;
        } else {
            statusElement.textContent = `🎉 Joueur 2 (${gameStatus.winner}) gagne! 🎉`;
        }
        statusElement.style.color = '#2e7d32'; // Green color for win
        statusElement.style.fontWeight = 'bold';
        return;
    }
    
    // Reset status styling for active game
    statusElement.style.color = '#444';
    statusElement.style.fontWeight = 'normal';
    
    // Show whose turn it is and k-alignment requirement
    if (currentPlayer === symbols.player1) {
        statusElement.textContent = `Tour du Joueur 1 (${symbols.player1}) - Alignez ${k} symboles pour gagner`;
    } else {
        statusElement.textContent = `Tour du Joueur 2 (${symbols.player2}) - Alignez ${k} symboles pour gagner`;
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
