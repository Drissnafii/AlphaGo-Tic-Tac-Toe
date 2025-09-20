// pure logic - ES6 Module
// Variables are private to this module
let gridSize = 3; // Default 3x3
let board = createEmptyBoard(gridSize);
let currentPlayer = "X";
let player1Symbol = "X"; // Player 1's chosen symbol
let player2Symbol = "O"; // Player 2's symbol (opposite of player 1)
let kAlignment = 3; // Number of symbols needed in a row to win
let gameWon = false; // Track if game is won
let winner = null; // Track who won
let winningLine = null; // Store winning line coordinates
let scores = { 'X': 0, 'O': 0, 'draw': 0 }; // Track wins for each symbol and draws

// Private function
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

// Private function
function validateGridSize(size) {
    return size >= 3 && size <= 13;
}

// Private function
function validateKAlignment(k) {
    return k >= 3 && k <= gridSize; 
}


// EXPORTED FUNCTIONS - Public API

// Set k-alignment value
export function setKAlignment(k) {
    if (!validateKAlignment(k)) {
        return false;
    }
    kAlignment = k;
    gameWon = false;
    winner = null;
    winningLine = null;
    saveGameState();
    return true;
}

// Get current k-alignment value
export function getKAlignment() {
    return kAlignment;
}

// Get current grid size
export function getGridSize() {
    return gridSize;
}

// Get current player
export function getCurrentPlayer() {
    return currentPlayer;
}

// Get current board state
export function getBoard() {
    return board;
}// Set player symbol preference
export function setPlayerSymbol(symbol) {
    player1Symbol = symbol;
    player2Symbol = (symbol === 'X') ? 'O' : 'X';
    currentPlayer = player1Symbol; // Player 1 always starts first
    saveGameState();
}

// Get current player symbols
export function getPlayerSymbols() {
    return {
        player1: player1Symbol,
        player2: player2Symbol
    };
}

// Get winning line coordinates
export function getWinningLine() {
    return winningLine;
}

// SCORE MANAGEMENT FUNCTIONS

// Get current scores
export function getScores() {
    return { ...scores }; // Return a copy to prevent external modification
}

// Increment score for a player
export function incrementScore(player) {
    if (scores[player] !== undefined) {
        scores[player]++;
        saveGameState(); // Save immediately after score change
    }
}

// Reset scores to zero
export function resetScores() {
    const symbols = getPlayerSymbols();
    scores = {};
    scores[symbols.player1] = 0;
    scores[symbols.player2] = 0;
    scores['draw'] = 0;
    saveGameState(); // Save the reset immediately
}

// Check for k consecutive symbols in a row and return winning line - Private function
function checkWin(symbol) {
    const directions = [[0,1], [1,0], [1,1], [1,-1]]; // horizontal, vertical, diagonal, anti-diagonal
    const directionNames = ['horizontal', 'vertical', 'diagonal', 'anti-diagonal'];
    
    // Check each starting position on the board
    for (let startRow = 0; startRow < gridSize; startRow++) {
        for (let startCol = 0; startCol < gridSize; startCol++) {
            // Check each direction from this starting position
            for (let dirIndex = 0; dirIndex < directions.length; dirIndex++) {
                const [dr, dc] = directions[dirIndex];
                let count = 0;
                
                // Check k consecutive positions in this direction
                for (let i = 0; i < kAlignment; i++) {
                    const newRow = startRow + i * dr;
                    const newCol = startCol + i * dc;
                    
                    // Check if position is within bounds
                    if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                        if (board[newRow][newCol] === symbol) {
                            count++;
                        } else {
                            break;
                        }
                    } else {
                        break; // Out of bounds
                    }
                }
                
                // If we found k consecutive symbols, we have a winner
                if (count === kAlignment) {
                    winningLine = {
                        startRow: startRow,
                        startCol: startCol,
                        direction: directionNames[dirIndex],
                        length: kAlignment
                    };
                    return true;
                }
            }
        }
    }
    
    return false;
}

// Check if board is full (all cells occupied) - Private function
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

// Check if game is won and by whom - Private function
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
export function getGameStatus() {
    return {
        gameWon: gameWon,
        winner: winner
    };
}

// Resize board to new size
export function resizeBoard(newSize) {
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
    winningLine = null;
    clearGameState();
    return true;
}

export function playTurn(row, col) {
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
        incrementScore(winner); // Increment score for the winner
    } else if (isBoardFull()) {
        gameWon = true;
        winner = 'draw';
        incrementScore('draw'); // Increment draw counter
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
        winner: winner,
        winningLine: winningLine,
        scores: scores // Save scores to localStorage
    };
    localStorage.setItem('ticTacToeGame', JSON.stringify(gameState));
}

export function loadGameState() {
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
        winningLine = gameState.winningLine || null;
        scores = gameState.scores || { 'X': 0, 'O': 0, 'draw': 0 }; // Load scores or default
        return true;
    }
    return false;
}

function clearGameState() {
    localStorage.removeItem('ticTacToeGame');
}

// Restart game function - resets to current grid size
export function restartGame() {
    // Reset board to empty state with current grid size
    board = createEmptyBoard(gridSize);
    
    // Reset to player 1's chosen symbol
    currentPlayer = player1Symbol;
    
    // Reset game status
    gameWon = false;
    winner = null;
    winningLine = null;
    
    // Clear localStorage
    clearGameState();
}  