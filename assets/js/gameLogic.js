console.log("the game is loading...");

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = "X";

function playTurn(row, col) {
    if (board[row][col] === '') {
        // Placer le symbole
        board[row][col] = currentPlayer;
        console.log(`Le joueur ${currentPlayer} a joué en [${row}, ${col}]`);

        // Changer de joueur
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        
        console.log("Prochain joueur :", currentPlayer);
        console.table(board);
    } else {
        console.log("Case déjà prise ! Essayez une autre.");
    }
}

playTurn(0,0);
playTurn(1,1);
playTurn(0,1);
playTurn(0,0);  