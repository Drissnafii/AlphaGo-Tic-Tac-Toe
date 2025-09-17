// pure logic
let gridSize = 3; // Default 3x3
let board = createEmptyBoard(gridSize);
let currentPlayer = "X";
let player1Symbol = "X"; // Player 1's chosen symbol
let player2Symbol = "O"; // Player 2's symbol (opposite of player 1)
let kAlignment = 3; // Number of symbols needed in a row to win
let gameWon = false; // Track if game is won
let winner = null; // Track who won

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

// Validate grid size
function validateGridSize(size) {
    return size >= 3 && size <= 6;
}

function validateKAlignment(k) {
    return k >= 3 && k <= gridSize;
}

// Set k-alignment value
function setKAlignment(k) {
    if (!validateKAlignment(k)) {
        return false;
    }
    kAlignment = k;
    gameWon = false;
    winner = null;
    saveGameState();
    return true;
}

// Get current k-alignment value
function getKAlignment() {
    return kAlignment;
}

// Set player symbol preference
function setPlayerSymbol(symbol) {
    player1Symbol = symbol;
    player2Symbol = (symbol === 'X') ? 'O' : 'X';
    currentPlayer = player1Symbol; // Player 1 always starts first
    saveGameState();
}

// Get current player symbols
function getPlayerSymbols() {
    return {
        player1: player1Symbol,
        player2: player2Symbol
    };
}

// Check for k consecutive symbols in a row
function checkWin(symbol) {
    // Check rows
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col <= gridSize - kAlignment; col++) {
            let count = 0;
            for (let i = 0; i < kAlignment; i++) {
                if (board[row][col + i] === symbol) {
                    count++;
                } else {
                    break;
                }
            }
            if (count === kAlignment) return true;
        }
    }
    
    // Check columns
    for (let col = 0; col < gridSize; col++) {
        for (let row = 0; row <= gridSize - kAlignment; row++) {
            let count = 0;
            for (let i = 0; i < kAlignment; i++) {
                if (board[row + i][col] === symbol) {
                    count++;
                } else {
                    break;
                }
            }
            if (count === kAlignment) return true;
        }
    }
    
    // _________________________________________________________________
    // Check main diagonal (top-left to bottom-right)
    for (let row = 0; row <= gridSize - kAlignment; row++) {
        for (let col = 0; col <= gridSize - kAlignment; col++) {
            let count = 0;
            for (let i = 0; i < kAlignment; i++) {
                if (board[row + i][col + i] === symbol) {
                    count++;
                } else {
                    break;
                }
            }
            if (count === kAlignment) return true;
        }
    }
    
    // _________________________________________________________________
    // Check anti-diagonal (top-right to bottom-left)
    for (let row = 0; row <= gridSize - kAlignment; row++) {
        for (let col = kAlignment - 1; col < gridSize; col++) {
            let count = 0;
            for (let i = 0; i < kAlignment; i++) {
                if (board[row + i][col - i] === symbol) {
                    count++;
                } else {
                    break;
                }
            }
            if (count === kAlignment) return true;
        }
    }
    
    return false;
}

// Check if board is full (all cells occupied)
function isBoardFull() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

// Check if game is won and by whom
function checkGameWon() {
    if (checkWin(player1Symbol)) {
        gameWon = true;
        winner = player1Symbol;
        return true;
    }
    if (checkWin(player2Symbol)) {
        gameWon = true;
        winner = player2Symbol;
        return true;
    }
    // Check for draw (board full with no winner)
    if (isBoardFull()) {
        gameWon = true;
        winner = 'draw';
        return true;
    }
    return false;
}

// Get game status
function getGameStatus() {
    return {
        gameWon: gameWon,
        winner: winner
    };
}

// Resize board to new size
function resizeBoard(newSize) {
    if (!validateGridSize(newSize)) {
        return false;
    }
    
    gridSize = newSize;

    if (kAlignment > gridSize) {
        kAlignment = gridSize;
    }
    board = createEmptyBoard(gridSize);
    currentPlayer = player1Symbol; // Reset to player 1's symbol
    gameWon = false;
    winner = null;
    clearGameState();
    return true;
}

function playTurn(row, col) {
    // Don't allow moves if game is already won
    if (gameWon || board[row][col] !== '') {
        return false;
    }
    
    // Place the symbol on the board
    board[row][col] = currentPlayer;
    
    // Check if this move wins the game or if board is full
    if (checkWin(currentPlayer)) {
        gameWon = true;
        winner = currentPlayer;
    } else if (isBoardFull()) {
        gameWon = true;
        winner = 'draw';
    } else {
        // Switch player (between player 1 and player 2 symbols)
        currentPlayer = (currentPlayer === player1Symbol) ? player2Symbol : player1Symbol;
    }
    
    // Save game state to localStorage
    saveGameState();
    
    return true;
}

// localStorage functions - data persistence logic
function saveGameState() {
    const gameState = {
        board: board,
        currentPlayer: currentPlayer,
        gridSize: gridSize,
        player1Symbol: player1Symbol,
        player2Symbol: player2Symbol,
        kAlignment: kAlignment,
        gameWon: gameWon,
        winner: winner
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
        player1Symbol = gameState.player1Symbol || 'X'; // Default to X if not saved
        player2Symbol = gameState.player2Symbol || 'O'; // Default to O if not saved
        kAlignment = gameState.kAlignment || 3; // Default to 3 if not saved
        gameWon = gameState.gameWon || false;
        winner = gameState.winner || null;
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
    
    // Reset to player 1's chosen symbol
    currentPlayer = player1Symbol;
    
    // Reset game status
    gameWon = false;
    winner = null;
    
    // Clear localStorage
    clearGameState();
}  