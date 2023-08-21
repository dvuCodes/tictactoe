"use strict";

// this is a module pattern (immediately invoked) for the gameboard
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let y = 0; y < columns; y++) {
      board[i].push("");
    }
  }

  // method to get gameboard
  const getBoard = () => board;

  // method to print game board
  const printBoard = () => console.log(board);

  return { getBoard, printBoard };
}

function gameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "O",
    },
  ];

  // init the active player as playerOne
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  // method to switch players
  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const addMarks = (player, mark) => {};

  return { players, getActivePlayer, switchPlayers, board };
}
// function to add marks to a specific box and then tie it to the dom

const game = gameFlow();
console.log(game.getActivePlayer());
game.switchPlayers();
console.log(game.getActivePlayer());
