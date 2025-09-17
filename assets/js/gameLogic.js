// pure logic
let gridSize = 3; // Default 3x3
let board = createEmptyBoard(gridSize);
let currentPlayer = "X";

// Create empty board of any size
function createEmptyBoard(size) {
    const newBoard = [];
    for (let i = 0; i < size; i++) {
        newBoard[i] = [];
        for (let j = 0; j < size; j++) {
            newBoard[i][j] = '';
        }
    }
    return newBoard;
}

// Validate grid size (3-6)
function validateGridSize(size) {
    return size >= 3 && size <= 6;
}

// Resize board to new size
function resizeBoard(newSize) {
    if (!validateGridSize(newSize)) {
        return false;
    }
    
    gridSize = newSize;
    board = createEmptyBoard(gridSize);
    currentPlayer = "X";
    clearGameState();
    return true;
}

// Pure game logic - no DOM manipulation
function playTurn(row, col) {
    if (board[row][col] === '') {
        // Place the symbol on the board
        board[row][col] = currentPlayer;

        // Switch player
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        
        // Save game state to localStorage
        saveGameState();
        
        return true;
    } else {
        return false;
    }
}

// localStorage functions - data persistence logic
function saveGameState() {
    const gameState = {
        board: board,
        currentPlayer: currentPlayer,
        gridSize: gridSize
    };
    localStorage.setItem('ticTacToeGame', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('ticTacToeGame');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        board = gameState.board;
        currentPlayer = gameState.currentPlayer;
        gridSize = gameState.gridSize || 3; // Default to 3 if not saved
        return true;
    }
    return false;
}

function clearGameState() {
    localStorage.removeItem('ticTacToeGame');
}

// Restart game function - resets to current grid size
function restartGame() {
    // Reset board to empty state with current grid size
    board = createEmptyBoard(gridSize);
    
    // Reset to player X
    currentPlayer = "X";
    
    // Clear localStorage
    clearGameState();
}  