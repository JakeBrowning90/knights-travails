//Create 8x8 gameboard with x,y matching physical layout
function makeSimBoard() {
    let gameboard = [];
    for (i = 0; i < 8; i++) {
        let row = [];
        for (j = 0; j < 8; j++) {
            let cell = [];
            cell.push(i);
            cell.push(j);
            row[j] = cell;
        }
        gameboard[i] = row;
    }
    return gameboard;
}

const gameboard = makeSimBoard();
// console.log(gameboard);

//Create array of all gameboard spaces
// function makeCalcBoard() {
//     let spaceArray = [];
//     for (i = 0; i < 8; i++) {
//         for (j = 0; j < 8; j++) {
//             let cell = [];
//             cell.push(i);
//             cell.push(j);
//             spaceArray.push(cell)
//         }
//     }
//     return spaceArray;
// }
// const spaceArray = makeCalcBoard();

// Return the valid moves a knight can make from a given space
function getPossibleMoves(cell) {
    // Get all 8 moves a knight can possibly make
    const nextMoves = [
        [cell[0] + 1, cell[1] + 2],
        [cell[0] + 2, cell[1] + 1],
        [cell[0] + 2, cell[1] - 1],
        [cell[0] + 1, cell[1] - 2],
        [cell[0] - 1, cell[1] - 2],
        [cell[0] - 2, cell[1] - 1],
        [cell[0] - 2, cell[1] + 1],
        [cell[0] - 1, cell[1] + 2]]
    // Return only the valid moves
    const validMoves = [];
    for (let i = 0; i < nextMoves.length; i++) {
        if (isMoveValid(nextMoves[i]) == true) {
            validMoves.push(nextMoves[i].toString());
        }
    }
    return validMoves;
}

// Check if a move lands on the board
function isMoveValid(outcome) {
    if (outcome[0] < 0 || outcome[0] > 7 || outcome[1] < 0 || outcome[1] > 7 ) {
        return false;
    } else {
        return true;
    }
}

// Node factory
class Node {
    constructor(value = null) {
        this.value = value;
        this.moves = [];
        this.parentMoves = [];
    }
}

// Tree factory
class SearchTree {
    constructor(start, end) {
        this.root = this.buildTree(start, end);
    }

    buildTree(square, end, moveHistory = []) {
        // Base case: 
        if (square == end) {
            return square;
        }
        
        let root = new Node(square);

        let possibleMoves = this.getPossibleMoves(root.value);
        root.moves = this.getNewMoves(possibleMoves, moveHistory);
        root.parentMoves.push(moveHistory)
        console.log(root.parentMoves);
        console.log(root.value);
        const pedigree = root.parentMoves;
        pedigree[pedigree.length] = root.value;
        // console.log(root.parentMoves);
        // Continue making roots if moves does not contain "end"
        if (root.moves.includes(end) == false ) {
            for (let i = 0; i < root.moves.length; i++) {
                // if (root.parentMoves.includes(root.moves[i]) == false) {
                //     root.moves[i] = this.buildTree(root.moves[i], end, pedigree)
                // }
                root.moves[i] = new Node(root.moves[i]);
                root.moves[i].moves = this.getPossibleMoves(root.moves[i].value);
            }
        }
        return root;
              
    }

    // Return the valid moves a knight can make from a given space
    getPossibleMoves(square) {
        // Get all 8 moves a knight can possibly make
        const nextMoves = [
            [square[0] + 1, square[1] + 2],
            [square[0] + 2, square[1] + 1],
            [square[0] + 2, square[1] - 1],
            [square[0] + 1, square[1] - 2],
            [square[0] - 1, square[1] - 2],
            [square[0] - 2, square[1] - 1],
            [square[0] - 2, square[1] + 1],
            [square[0] - 1, square[1] + 2]];
        // Return only moves that don't go off the board
        const validMoves = [];
        for (let i = 0; i < nextMoves.length; i++) {
            if (this.isMoveValid(nextMoves[i]) == true) {
                validMoves.push(nextMoves[i]);
            }
        }
        return validMoves;
    }

    // Check if a move lands on the board
    isMoveValid(outcome) {
        if (outcome[0] < 0 || outcome[0] > 7 || outcome[1] < 0 || outcome[1] > 7 ) {
            return false;
        } else {
            return true;
        }
    }

    // Check if a move is going in a loop
    getNewMoves(possibleMoves, moveHistory) {
        console.log(moveHistory);
        let newMoves = [];
        for (let i = 0; i < possibleMoves.length; i++) {
            if (moveHistory.includes(possibleMoves[i]) == false) {
                newMoves.push(possibleMoves[i]);
            }
        }
        return newMoves;
    }
}

// Take start and end squares as arguments
function knightMoves(start, end) {
    // Set "start" as root of new tree
    const search = new SearchTree(start, end);
    // console.log(search.root.value);
    console.log(search.root.moves);
    console.log(search.root);
    // Get all of root's valid moves, 
    
    // Recurse if valid moves do not include "end"
    
    
    //Return array [start, path, end]
    }

 knightMoves(gameboard[3][6], gameboard[0][0]);