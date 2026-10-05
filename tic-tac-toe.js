const gameBoard = (function() {
    const board = [];
    const emptySquare = ' ';
    const boardSize = 3;

    for (let i = 0; i < boardSize; i++) {
      board[i] = new Array(boardSize);
    }

    const isEmpty = function(row, column) {
      if (board[row] && board[row][column] === emptySquare) {
        return true;
      }
      return false;
    };

    const placeMarker = function(row, column, marker) {
      if (isEmpty(row, column)) {
        board[row][column] = marker;
        return true;
      }
      return false;
    };

    const isFull = function() {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (isEmpty(i, j)) {
            return false;
          }
        }
      }
      return true;
    };

    const getBoard = function() {
      return board;
    };

    const reset = function() {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = emptySquare;
        }
      }
    };

    reset();

    return {placeMarker, getBoard, isEmpty, isFull, reset};
})();

function Player(name, marker) {
  return {
    name: name,
    marker: marker,
  };
}

function game() {
  const board = gameBoard;
  let activePlayer = 0;
  const players = [
    Player('Player One', 'X'),
    Player('Player Two', 'O')
  ];

  const roundInstructions = function() {
      
  };

  const switchPlayer = function() {
    activePlayer = activePlayer == 0 ? 1 : 0;
  };
}