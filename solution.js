// Node factory
class Node {
    constructor(position, moveHistory) {
        this.position = position;
        this.moveHistory = moveHistory;
    }
}

function knightMoves([startX, startY], [goalX, goalY]) {
    // Initialise a queue containing a Node made from the starting square
    let queue = [new Node([startX, startY], [[startX, startY]])];
    //Remove the first Node from the queue and set as currentNode
    let currentNode = queue.shift();

    // If the currentNode's position isn't the goal, determine the next potential moves
    while (currentNode.position[0] != goalX || currentNode.position[1] != goalY) {
        let moves = [
            [currentNode.position[0] + 2, currentNode.position[1] - 1],
            [currentNode.position[0] + 2, currentNode.position[1] + 1],
            [currentNode.position[0] - 2, currentNode.position[1] - 1],
            [currentNode.position[0] - 2, currentNode.position[1] + 1],
            [currentNode.position[0] + 1, currentNode.position[1] - 2],
            [currentNode.position[0] + 1, currentNode.position[1] + 2],
            [currentNode.position[0] - 1, currentNode.position[1] - 2],
            [currentNode.position[0] - 1, currentNode.position[1] + 2],
        ];
        // Turn each (valid) move into a new Node, with its path = current node's path plus the move position
        moves.forEach((move) => {
            if ((move[0] >= 0 && move[0] <= 7) && (move[1] >= 0 && move[1] <= 7)) {
                let node = new Node(move, currentNode.moveHistory.concat([move]));
                // Add each node to the end of the queue
                queue.push(node);
            }
        });
        // Remove the next Node from the queue, set as currentNode, and repeat "while" loop
        currentNode = queue.shift();
    }

    // If the currentNode is the goal, display its path to show the solution
    console.log(`=> You made it in ${currentNode.moveHistory.length - 1} moves!  Here's your path:`);
    currentNode.moveHistory.forEach((position) => {
        console.log(position);
    });
}

knightMoves([0, 0], [7, 7]);