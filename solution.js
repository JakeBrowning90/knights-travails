// Returns a node's position and the path taken to reach it.
function Node(pos, path) {
    // Only return a node whose position is on the board
    if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
      return null;
    }
    return { pos, path };
  }


function knightMoves([x, y], [a, b]) {
    // Initialise a queue containing a Node made from the starting square
    let queue = [Node([x, y], [[x, y]])];
    //Remove the first Node from the queue and set as currentNode
    let currentNode = queue.shift();

    // If the currentNode's position isn't the goal, determine the next potential moves
    while (currentNode.pos[0] !== a || currentNode.pos[1] !== b) {
        let moves = [
            [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
        ];
        // Turn each (valid) move into a new Node, with its path = current node's path plus the move position
        moves.forEach((move) => {
            let node = Node(move, currentNode.path.concat([move]));
            if (node) {
                // Add each node to the end of the queue
                queue.push(node);
            }
        });
        // Remove the first Node from the queue, set as currentNode, and repeat "while" loop
        currentNode = queue.shift();
    }

    // If the currentNode is the goal, display its path to show the solution
    console.log(
        `=> You made it in ${currentNode.path.length - 1} moves!  Here's your path:`
    );
    console.log(currentNode.path);
    currentNode.path.forEach((pos) => {
        console.log(pos);
    });
}

knightMoves([0, 0], [7, 7]);