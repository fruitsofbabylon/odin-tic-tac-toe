const gameBoard = (function() {
    const board = [];
    const emptySquare = ' ';
    const boardSize = 3;

    for (let i = 0; i < boardSize; i++) {
      board[i] = new Array(boardSize);
    }

    const isEmpty = function(row, column) {
      return board[row] && board[row][column] === emptySquare;
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

    const getSquare = function(row, column) {
      if (board[row]) {
        return board[row][column];
      }
      return undefined;
    };

    const reset = function() {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = emptySquare;
        }
      }
    };

    reset();

    return {placeMarker, getBoard, isEmpty, isFull, getSquare, reset};
})();

function Player(name, marker) {
  return {
    name: name,
    marker: marker,
  };
}

const game = (function() {
  let activePlayer = 0;
  let winner = null;
  const players = [
    Player('Player One', 'X'),
    Player('Player Two', 'O')
  ];

  const winLines = [
    [[0, 0], [0, 1], [0, 2]],   //rows
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],   //columns
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],   
    [[0, 0], [1, 1], [2, 2]],   //diagonals
    [[0, 2], [1, 1], [2, 0]],
  ];

  const setPlayers = function(nameOne, nameTwo) {
    players[0] = Player(nameOne, 'X');
    players[1] = Player(nameTwo, 'O');
  };

  const roundInstructions = function() {
    console.log('New game. Player One starts. To move, call game.playRound(row, column).');
  };

  const winCheck = function() {
    let line = [];
    for (let i = 0; i < winLines.length; i++) {
      for (let j = 0; j < winLines[i].length; j++) {
        const currentSquare = gameBoard.getSquare(winLines[i][j][0], winLines[i][j][1]);
        line.push(currentSquare);
      }
      if (line[0] === line[1] && line[1] === line[2] && !gameBoard.isEmpty(winLines[i][0][0], winLines[i][0][1])) {
        return line[0];
      }
      line = [];
    }
    return null;
  };

  const switchPlayer = function() {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };

  const playRound = function(row, column) {
    if (winner !== null) {
      return 'Game is over. To restart use game.restart()';
    }

    if (!gameBoard.placeMarker(row, column, players[activePlayer].marker)) {
      return 'Square taken or does not exist. Try again.';
    }

    console.table(gameBoard.getBoard());

    if (winCheck() !== null) {
      winner = players[activePlayer].name;
      return `Game is over, the winner is ${winner}. To restart use game.restart()`;
    }
    
    if (gameBoard.isFull()) {
      winner = 'tie';
      return 'This is a tie. To restart use game.restart()';
    }

    switchPlayer();
    return `${players[activePlayer].name}'s turn now. Call game.playRound(row, column).`;
  };

  const getWinner = function() {
    return winner;
  };

  const restart = function() {
    winner = null;
    activePlayer = 0;
    gameBoard.reset();
    roundInstructions();
  };

  const getActivePlayer = function() {
    return players[activePlayer];
  };

  roundInstructions();

  return {setPlayers, playRound, getWinner, getActivePlayer, restart};
})();

const displayController = (function() {
  const container = document.querySelector('#board');
  const startButton = document.querySelector('#start');
  const setup = document.querySelector('#setup');
  const status = document.querySelector('#status');
  let started = false;

  const render = function() {
    container.textContent = '';
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const square = document.createElement('button');
        square.textContent = board[i][j];
        square.dataset.row = i;
        square.dataset.column = j;
        container.appendChild(square);

        if (!gameBoard.isEmpty(i, j)) {
          square.classList.add('taken');
        }

        if (!started || game.getWinner() !== null) {
          square.disabled = true;
        }
      }
    }
  };

  const updateStatus = function() {
    const winner = game.getWinner(); 
    if (winner === 'tie') {
      status.textContent = `This is a tie. To restart the game fill in player's names and 'Start' the game.`;
      setup.classList.remove('hidden');
    } else if (winner !== null) {
      status.textContent = `Game is over, the winner is ${winner}. To restart the game fill in player's names and 'Start' the game.`;
      setup.classList.remove('hidden');
    } else {
      status.textContent = `${game.getActivePlayer().name}'s turn.`;
    }
  };

  container.addEventListener('click', function(e) {
    const square = e.target.closest('button');
    if (!square) return;
    const row = Number(square.dataset.row);
    const column = Number(square.dataset.column);
    game.playRound(row, column);
    render();
    updateStatus();
  });

  startButton.addEventListener('click', function(e) {
    let playerOneName = document.getElementById('player-one').value.trim();
    let playerTwoName = document.getElementById('player-two').value.trim();

    if (playerOneName === '') {
      playerOneName = 'Player One';
    }
    
    if (playerTwoName === '') {
      playerTwoName = 'Player Two';
    }

    started = true;
    game.setPlayers(playerOneName, playerTwoName);
    setup.classList.add('hidden');
    game.restart();
    render();
    updateStatus();
  });

  return {render};
})();

displayController.render();