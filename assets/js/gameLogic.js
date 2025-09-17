// pure logic
let gridSize = 3; // Default 3x3
let board = createEmptyBoard(gridSize);
let currentPlayer = "X";
let playerSymbol = "X"; // Player's chosen symbol
let computerSymbol = "O"; // Computer's symbol (opposite of player)

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

// Set player symbol preference
function setPlayerSymbol(symbol) {
    playerSymbol = symbol;
    computerSymbol = (symbol === 'X') ? 'O' : 'X';
    currentPlayer = playerSymbol; // Player always starts first
    saveGameState();
}

// Get current player symbols
function getPlayerSymbols() {
    return {
        player: playerSymbol,
        computer: computerSymbol
    };
}

// Resize board to new size
function resizeBoard(newSize) {
    if (!validateGridSize(newSize)) {
        return false;
    }
    
    gridSize = newSize;
    board = createEmptyBoard(gridSize);
    currentPlayer = playerSymbol; // Reset to player's symbol
    clearGameState();
    return true;
}

// Pure game logic - no DOM manipulation
function playTurn(row, col) {
    if (board[row][col] === '') {
        // Place the symbol on the board
        board[row][col] = currentPlayer;

        // Switch player (between player and computer symbols)
        currentPlayer = (currentPlayer === playerSymbol) ? computerSymbol : playerSymbol;
        
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
        gridSize: gridSize,
        playerSymbol: playerSymbol,
        computerSymbol: computerSymbol
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
        playerSymbol = gameState.playerSymbol || 'X'; // Default to X if not saved
        computerSymbol = gameState.computerSymbol || 'O'; // Default to O if not saved
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
    
    // Reset to player's chosen symbol
    currentPlayer = playerSymbol;
    
    // Clear localStorage
    clearGameState();
}  