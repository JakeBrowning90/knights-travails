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
    constructor(value = null, parentMoves = null) {
        this.value = value;
        this.nextMoves = [];
        this.parentMoves = parentMoves;
    }
}

// Tree factory
class SearchTree {
    constructor(start, end) {
        this.root = this.buildTree(start, end);
    }

    buildTree(square, goal, priorMoves  = [null]) {
        // Base case: stop recursion once the goal square is found 
        if (square == goal) {
            console.log("Goal Found!")
            const root = new Node(square, priorMoves);
            return root;
        }
        const root = new Node(square, priorMoves);
        const possibleMoves = this.getPossibleMoves(root.value);
        root.nextMoves = this.getNewMoves(possibleMoves, priorMoves)
        const moveHistory = [];
        moveHistory.push(priorMoves);
        moveHistory.push(root.value);
        // console.log(moveHistory);
        console.log(root);
        // Check if nextMoves contains the goal
        for (let i = 0; i < root.nextMoves.length; i++) {
            // if (root.nextMoves[i][0] === goal[0] && root.nextMoves[i][1] === goal[1]) {
            if (root.nextMoves[i].toString() === goal.toString()) {
                console.log("Found it!");
                const goalNode = new Node(goal, moveHistory);
                return goalNode;
            } 
        }

        // If no matches, get a new generation of nodes
        for (let i = 0; i < root.nextMoves.length; i++){
            root.nextMoves[i] = this.buildTree(root.nextMoves[i], goal, moveHistory);
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
            if ((nextMoves[i][0] >= 0 && nextMoves[i][0] <= 7) && (nextMoves[i][1] >= 0 && nextMoves[i][1] <= 7)) {
                validMoves.push(nextMoves[i]);
            }
        }
        return validMoves;
    }

    // Check if a move is going in a loop
    getNewMoves(possibleMoves, moveHistory) {
        console.log(possibleMoves);
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
    console.log(search);
    // Get all of root's valid moves, 
    
    // Recurse if valid moves do not include "end"
    
    
    //Return array [start, path, end]
    }

 knightMoves(gameboard[0][0], gameboard[1][2]);