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
console.log(gameboard);

//Create array of all gameboard spaces
function makeCalcBoard() {
    let spaceArray = [];
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let cell = [];
            cell.push(i);
            cell.push(j);
            spaceArray.push(cell)
        }
    }
    return spaceArray;
}

const spaceArray = makeCalcBoard();
//console.log(spaceArray);

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

const startingCell = gameboard[3][6];
console.log("From "+ startingCell.toString() + ", you can go to:");
console.log(getPossibleMoves(startingCell));

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

    buildTree(square, end){
        // Base case: 

        let root = new Node(square);
        root.moves = this.getPossibleMoves(root);
        // Continue making roots if moves does not contain "end"
        // if (root.moves.includes(end) == false) {
        //     for (let i = 0; i < root.moves.length; i++) {
        //         root.moves[i] = this.buildTree(root.moves[i])
        //     }
        // }
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
            [square[0] - 1, square[1] + 2]]
        // Return only the valid moves
        const validMoves = [];
        for (let i = 0; i < nextMoves.length; i++) {
            if (this.isMoveValid(nextMoves[i]) == true) {
                validMoves.push(nextMoves[i]);
            }
        }
        console.log(square.parentMoves);
        //this.loopingMoves.push(validMoves);
        return validMoves;
    }

    // Check if a move lands on the board and isn't revisting a square
    isMoveValid(outcome) {
        if (outcome[0] < 0 || outcome[0] > 7 || outcome[1] < 0 || outcome[1] > 7 ) {
            return false;
        } else {
            return true;
        }
    }
}

// Take start and end squares as arguments
function knightMoves(start, end) {
    // Set "start" as root of new tree
    const search = new SearchTree(start, end);
    console.log(search.root.value);
    console.log(search.root.moves);
    console.log(search.root);
    // Get all of root's valid moves, 
    
    // Recurse if valid moves do not include "end"
    
    
    //Return array [start, path, end]
    }

 knightMoves(gameboard[3][6], gameboard[0][0]);