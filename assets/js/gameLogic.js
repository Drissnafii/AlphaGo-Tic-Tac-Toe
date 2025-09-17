console.log("the game is loading...");

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = "X";

function playTurn(row, col) {
    if (board[row][col] === '') {
        // Place the symbol on the board
        board[row][col] = currentPlayer;
        console.log(`Player ${currentPlayer} played at [${row}, ${col}]`);

        // Update the UI
        updateBoard();
        updateStatus();

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

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cellIndex = i * 3 + j;
            cells[cellIndex].textContent = board[i][j];
        }
    }
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `${currentPlayer}'s turn`;
}

function handleCellClick(cellIndex) {
    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;
    playTurn(row, col);
}

// localStorage functions
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