console.log("Knight time!")

// Take start and end squares as arguments
function knightMoves() {
//Return array [start, path, end]
}

//Create 8x8 gameboard
function makeBoard() {
    let gameboard = [];
    for (i = 0; i < 8; i++) {
        let row = [];
        for (j = 0; j < 8; j++) {
            let cell = [];
            cell.push(i);
            cell.push(j);
            row[j] = cell.reverse().toString();
        }
        gameboard[i] = row;
    }
    return gameboard.reverse();
}

const gameboard = makeBoard();
console.log(gameboard);