// UI functions / DOM manipulation - ES6 Module

// Import functions from gameLogic module
import { 
    getGridSize, 
    getBoard, 
    getGameStatus, 
    getWinningLine, 
    getPlayerSymbols, 
    getCurrentPlayer, 
    getKAlignment,
    getScores
} from './gameLogic.js';

export function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    const gridSize = getGridSize();
    const board = getBoard();
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cellIndex = i * gridSize + j;
            if (cells[cellIndex]) {
                const cellValue = board[i][j];
                cells[cellIndex].textContent = cellValue;
                
                // Remove previous classes
                cells[cellIndex].classList.remove('cell-x', 'cell-o', 'winning-cell');
                
                // Add appropriate class based on cell value
                if (cellValue === 'X') {
                    cells[cellIndex].classList.add('cell-x');
                } else if (cellValue === 'O') {
                    cells[cellIndex].classList.add('cell-o');
                }
            }
        }
    }
    
    // Highlight winning line if game is won
    const gameStatus = getGameStatus();
    if (gameStatus.gameWon && gameStatus.winner !== 'draw') {
        highlightWinningLine();
    }
}

// Highlight the winning line cells - Private function
function highlightWinningLine() {
    const winLine = getWinningLine();
    const gridSize = getGridSize();
    if (!winLine) return;
    
    const cells = document.querySelectorAll('.cell');
    
    for (let i = 0; i < winLine.length; i++) {
        let row, col;
        
        switch (winLine.direction) {
            case 'horizontal':
                row = winLine.startRow;
                col = winLine.startCol + i;
                break;
            case 'vertical':
                row = winLine.startRow + i;
                col = winLine.startCol;
                break;
            case 'diagonal':
                row = winLine.startRow + i;
                col = winLine.startCol + i;
                break;
            case 'anti-diagonal':
                row = winLine.startRow + i;
                col = winLine.startCol - i;
                break;
        }
        
        const cellIndex = row * gridSize + col;
        if (cells[cellIndex]) {
            // Add winning class with a delay for animation effect
            setTimeout(() => {
                cells[cellIndex].classList.add('winning-cell');
                // Add group hover event listeners
                setupWinningLineHover(cells[cellIndex]);
            }, i * 100); // Stagger the animation
        }
    }
}

// Setup group hover effect for winning line - Private function
function setupWinningLineHover(cell) {
    cell.addEventListener('mouseenter', () => {
        // Add hover class to all winning cells
        const allWinningCells = document.querySelectorAll('.winning-cell');
        allWinningCells.forEach(winCell => {
            winCell.classList.add('line-hover');
        });
    });
    
    cell.addEventListener('mouseleave', () => {
        // Remove hover class from all winning cells
        const allWinningCells = document.querySelectorAll('.winning-cell');
        allWinningCells.forEach(winCell => {
            winCell.classList.remove('line-hover');
        });
    });
}

// Clear all winning highlights
export function clearWinningHighlight() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('winning-cell');
    });
}

export function updateStatus() {
    const statusElement = document.getElementById('status');
    const symbols = getPlayerSymbols();
    const gameStatus = getGameStatus();
    const k = getKAlignment();
    const currentPlayer = getCurrentPlayer();
    
    // Check if game is won or drawn
    if (gameStatus.gameWon) {
        if (gameStatus.winner === 'draw') {
            statusElement.textContent = `🤝 Match nul! Toutes les cases sont remplies 🤝`;
            statusElement.style.color = '#ff9800'; // Orange color for draw
        } else if (gameStatus.winner === symbols.player1) {
            statusElement.textContent = `🎉 Joueur 1 (${gameStatus.winner}) gagne! 🎉`;
            statusElement.style.color = '#2e7d32'; // Green color for win
        } else {
            statusElement.textContent = `🎉 Joueur 2 (${gameStatus.winner}) gagne! 🎉`;
            statusElement.style.color = '#2e7d32'; // Green color for win
        }
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

export function generateGameBoard(size) {
    const gameBoard = document.getElementById('game-board');
    
    gameBoard.innerHTML = '';
    
    // Calculate cell size based on fixed board size
    // Board is 400px x 400px with 10px padding on each side = 380px available space
    // Gap between cells is 3px, so we need to account for (size-1) gaps
    const availableSpace = 380;
    const totalGapSpace = (size - 1) * 3; // 3px gap between cells
    const cellSize = Math.floor((availableSpace - totalGapSpace) / size);
    
    // Calculate font size based on cell size (proportional scaling)
    const fontSize = Math.max(Math.floor(cellSize * 0.6), 16); // Minimum 16px font
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.fontSize = `${fontSize}px`;
        gameBoard.appendChild(cell);
    }
    
    gameBoard.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;
}

// Update score display
export function updateScores() {
    const scores = getScores();
    const symbols = getPlayerSymbols();
    
    // Update score display elements
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const scoreDrawElement = document.getElementById('score-draw');
    const player1LabelElement = document.getElementById('player1-label');
    const player2LabelElement = document.getElementById('player2-label');
    
    if (scoreXElement && scoreOElement && scoreDrawElement) {
        // Update scores based on current player symbols
        scoreXElement.textContent = scores['X'] || 0;
        scoreOElement.textContent = scores['O'] || 0;
        scoreDrawElement.textContent = scores['draw'] || 0;
    }
    
    // Update player labels if they exist
    if (player1LabelElement && player2LabelElement) {
        player1LabelElement.textContent = `Joueur 1 (${symbols.player1})`;
        player2LabelElement.textContent = `Joueur 2 (${symbols.player2})`;
    }
}
