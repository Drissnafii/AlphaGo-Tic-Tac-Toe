// from gameLogic module
import { 
    playTurn, 
    restartGame, 
    setPlayerSymbol, 
    setKAlignment, 
    getKAlignment, 
    resizeBoard, 
    loadGameState, 
    getGridSize, 
    getPlayerSymbols 
} from './gameLogic.js';

// from ui module
import { 
    updateBoard, 
    updateStatus, 
    generateGameBoard, 
    clearWinningHighlight 
} from './ui.js';

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function handleCellClick(cellIndex) {
    const gridSize = getGridSize();
    const row = Math.floor(cellIndex / gridSize);
    const col = cellIndex % gridSize;
    
    // Game logic
    const moveSuccessful = playTurn(row, col);
    
    // Update UI
    if (moveSuccessful) {
        updateBoard();
        updateStatus();
    }
}

// Restart button
function handleRestartClick() {
    // Clear any winning highlights first
    clearWinningHighlight();
    
    // Game logic
    restartGame();
    
    // Update UI
    const gridSize = getGridSize();
    generateGameBoard(gridSize);
    setupCellListeners();
    updateBoard();
    updateStatus();
}

// Symbol selection change
function handleSymbolChange() {
    const selectedSymbol = document.querySelector('input[name="player-symbol"]:checked').value;
    
    // Clear any winning highlights first
    clearWinningHighlight();
    
    setPlayerSymbol(selectedSymbol);
    updateStatus();
}

// K-alignment change
function handleKAlignmentChange() {
    const input = document.getElementById('k-alignment-input');
    const newK = parseInt(input.value);
    
    if (setKAlignment(newK)) {
        // Clear any winning highlights first
        clearWinningHighlight();
        
        // Reset the game since k-alignment affects win conditions
        restartGame();
        const gridSize = getGridSize();
        generateGameBoard(gridSize);
        setupCellListeners();
        updateBoard();
        updateStatus();
    } else {
        input.value = getKAlignment();
    }
}

// Grid size change
function handleGridSizeChange() {
    const input = document.getElementById('grid-size-input');
    const newSize = parseInt(input.value);
    
    if (resizeBoard(newSize)) {
        // Clear any winning highlights first
        clearWinningHighlight();
        
        const gridSize = getGridSize();
        generateGameBoard(gridSize);
        setupCellListeners();
        updateBoard();
        updateStatus();
        
        // Update k-alignment input max value and current value if needed
        const kInput = document.getElementById('k-alignment-input');
        kInput.max = gridSize;
        if (getKAlignment() > gridSize) {
            kInput.value = gridSize;
        } else {
            kInput.value = getKAlignment();
        }
    }
}

// Setup event listeners for all cells
function setupCellListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            handleCellClick(index);
        });
    });
}

function initializeGame() {
    // Load saved game state if available
    const stateLoaded = loadGameState();
    
    // Update symbol selection radio buttons based on loaded state
    const playerSymbols = getPlayerSymbols();
    const player1SymbolRadio = document.querySelector(`input[name="player-symbol"][value="${playerSymbols.player1}"]`);
    if (player1SymbolRadio) {
        player1SymbolRadio.checked = true;
    }
    
    // Generate board based on current grid size
    const gridSize = getGridSize();
    generateGameBoard(gridSize);
    
    // Setup event listeners
    setupCellListeners();
    
    // Add restart button event listener
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', handleRestartClick);
    
    // Add grid size change event listener
    const applySizeBtn = document.getElementById('apply-size-btn');
    applySizeBtn.addEventListener('click', handleGridSizeChange);
    
    // Add k-alignment change event listener
    const applyKBtn = document.getElementById('apply-k-btn');
    applyKBtn.addEventListener('click', handleKAlignmentChange);
    
    // Add symbol selection change event listeners
    const symbolRadios = document.querySelectorAll('input[name="player-symbol"]');
    symbolRadios.forEach(radio => {
        radio.addEventListener('change', handleSymbolChange);
    });
    
    // Update grid size input to match current size
    const gridSizeInput = document.getElementById('grid-size-input');
    gridSizeInput.value = gridSize;
    
    // Update k-alignment input to match current k value and set max
    const kAlignmentInput = document.getElementById('k-alignment-input');
    kAlignmentInput.value = getKAlignment();
    kAlignmentInput.max = gridSize;
    
    // Update display
    updateBoard();
    updateStatus();
}
