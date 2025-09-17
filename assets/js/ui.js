// UI functions / DOM manipulation.

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
