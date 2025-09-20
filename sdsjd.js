// Mathematical approach to win detection using direction vectors
// This replaces your current checkWin function with a more elegant mathematical solution

// Direction vectors representing all possible winning directions
const DIRECTION_VECTORS = [
    [0, 1],   // Horizontal: →
    [1, 0],   // Vertical: ↓  
    [1, 1],   // Main diagonal: ↘
    [1, -1]   // Anti-diagonal: ↙
];

// Mathematical win detection using vector-based approach
function checkWinMathematical(board, gridSize, kAlignment, symbol) {
    // For each possible starting position on the board
    for (let startRow = 0; startRow < gridSize; startRow++) {
        for (let startCol = 0; startCol < gridSize; startCol++) {
            
            // For each direction vector
            for (let dirIndex = 0; dirIndex < DIRECTION_VECTORS.length; dirIndex++) {
                const [dr, dc] = DIRECTION_VECTORS[dirIndex];
                
                // Check if we can fit k symbols in this direction from this starting position
                const endRow = startRow + (kAlignment - 1) * dr;
                const endCol = startCol + (kAlignment - 1) * dc;
                
                // Bounds check using mathematical constraints
                if (endRow >= 0 && endRow < gridSize && endCol >= 0 && endCol < gridSize) {
                    
                    // Check k consecutive positions using vector mathematics
                    let consecutiveCount = 0;
                    for (let i = 0; i < kAlignment; i++) {
                        const currentRow = startRow + i * dr;
                        const currentCol = startCol + i * dc;
                        
                        if (board[currentRow][currentCol] === symbol) {
                            consecutiveCount++;
                        } else {
                            break; // Break early if sequence is broken
                        }
                    }
                    
                    // Mathematical condition: all k positions must match
                    if (consecutiveCount === kAlignment) {
                        return {
                            found: true,
                            winningLine: {
                                startRow: startRow,
                                startCol: startCol,
                                endRow: endRow,
                                endCol: endCol,
                                direction: getDirectionName(dirIndex),
                                directionVector: [dr, dc],
                                length: kAlignment
                            }
                        };
                    }
                }
            }
        }
    }
    
    return { found: false, winningLine: null };
}

// Helper function to convert direction index to readable name
function getDirectionName(dirIndex) {
    const names = ['horizontal', 'vertical', 'diagonal', 'anti-diagonal'];
    return names[dirIndex];
}

// Alternative O(1) space complexity approach using mathematical optimization
// This version reduces redundant checks by calculating valid starting positions mathematically
function checkWinOptimized(board, gridSize, kAlignment, symbol) {
    
    for (let dirIndex = 0; dirIndex < DIRECTION_VECTORS.length; dirIndex++) {
        const [dr, dc] = DIRECTION_VECTORS[dirIndex];
        
        // Mathematical calculation of valid starting position ranges
        const minStartRow = Math.max(0, (kAlignment - 1) * Math.min(0, dr));
        const maxStartRow = Math.min(gridSize - 1, gridSize - 1 - (kAlignment - 1) * Math.max(0, dr));
        const minStartCol = Math.max(0, (kAlignment - 1) * Math.min(0, dc));
        const maxStartCol = Math.min(gridSize - 1, gridSize - 1 - (kAlignment - 1) * Math.max(0, dc));
        
        // Iterate only through mathematically valid starting positions
        for (let startRow = minStartRow; startRow <= maxStartRow; startRow++) {
            for (let startCol = minStartCol; startCol <= maxStartCol; startCol++) {
                
                // Vector-based consecutive checking
                let isWinning = true;
                for (let i = 0; i < kAlignment && isWinning; i++) {
                    const checkRow = startRow + i * dr;
                    const checkCol = startCol + i * dc;
                    
                    if (board[checkRow][checkCol] !== symbol) {
                        isWinning = false;
                    }
                }
                
                if (isWinning) {
                    return {
                        found: true,
                        winningLine: {
                            startRow: startRow,
                            startCol: startCol,
                            endRow: startRow + (kAlignment - 1) * dr,
                            endCol: startCol + (kAlignment - 1) * dc,
                            direction: getDirectionName(dirIndex),
                            directionVector: [dr, dc],
                            length: kAlignment
                        }
                    };
                }
            }
        }
    }
    
    return { found: false, winningLine: null };
}

// Integration example: Replace your existing checkWin function
function checkWin(symbol) {
    const result = checkWinOptimized(board, gridSize, kAlignment, symbol);
    
    if (result.found) {
        winningLine = result.winningLine;
        return true;
    }
    
    return false;
}

// Mathematical analysis: Time complexity comparison
/*
Original approach: O(n²) for each direction × 4 directions = O(4n²) = O(n²)
Mathematical approach: O(n²) but with optimized bounds and early termination
Optimized approach: O(valid_positions × k) where valid_positions < n²

The mathematical formulation provides:
1. Cleaner, more maintainable code
2. Better separation of concerns (direction logic separated)
3. Easier to extend to new directions or 3D boards
4. Mathematical elegance through vector operations
*/

// Example usage and testing
function demonstrateMathematicalApproach() {
    // Test with a sample 5x5 board
    const testBoard = [
        ['X', '', '', '', ''],
        ['', 'X', '', '', ''],
        ['', '', 'X', '', ''],
        ['', '', '', 'X', ''],
        ['', '', '', '', '']
    ];
    
    const result = checkWinMathematical(testBoard, 5, 4, 'X');
    
    if (result.found) {
        console.log('Win detected!');
        console.log('Direction vector:', result.winningLine.directionVector);
        console.log('Mathematical line equation: f(t) = (' + 
                   result.winningLine.startRow + ',' + result.winningLine.startCol + 
                   ') + t×(' + result.winningLine.directionVector[0] + ',' + 
                   result.winningLine.directionVector[1] + ') for t ∈ [0,' + 
                   (result.winningLine.length - 1) + ']');
    }
}