console.log("the game is loading...");

// Game state variables - pure logic
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = "X";

// Pure game logic - no DOM manipulation
function playTurn(row, col) {
    if (board[row][col] === '') {
        // Place the symbol on the board
        board[row][col] = currentPlayer;
        console.log(`Player ${currentPlayer} played at [${row}, ${col}]`);

        // Switch player
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        
        // Save game state to localStorage
        saveGameState();
        
        console.log("Next player:", currentPlayer);
        console.table(board);
        return true;
    } else {
        console.log("Cell already taken! Try another one.");
        return false;
    }
}

// localStorage functions - data persistence logic
function saveGameState() {
    const gameState = {
        board: board,
        currentPlayer: currentPlayer
    };
    localStorage.setItem('ticTacToeGame', JSON.stringify(gameState));
    console.log("Game state saved to localStorage");
}

function loadGameState() {
    const savedState = localStorage.getItem('ticTacToeGame');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        board = gameState.board;
        currentPlayer = gameState.currentPlayer;
        console.log("Game state loaded from localStorage");
        console.table(board);
        return true;
    }
    console.log("No saved game state found");
    return false;
}

function clearGameState() {
    localStorage.removeItem('ticTacToeGame');
    console.log("Game state cleared from localStorage");
}

// Restart game function - resets to initial state
function restartGame() {
    // Reset board to empty state
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    // Reset to player X
    currentPlayer = "X";
    
    // Clear localStorage
    clearGameState();
    
    console.log("Game restarted!");
    console.table(board);
}  