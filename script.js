"use strict";

// function to render the gameboard
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // method to find the cell at a given row and column
  const getCell = (row, columns) => board[row][columns];

  const getBoard = () => board;

  const printBoard = () => {
    const boardMappedWithValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardMappedWithValues);
  };

  return { getBoard, printBoard, getCell };
})();

// A cell represents a single cell on the gameboard
// A cell can be empty or have a mark
// A cell can be marked by a player
function Cell() {
  let value = "";

  const getValue = () => value;

  const setValue = (newValue) => (value = newValue);

  return { getValue, setValue };
}

function GameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
  const players = [
    {
      playerOneName: playerOneName,
      mark: "X",
    },
    {
      playerTwoName: playerTwoName,
      mark: "O",
    },
  ];

  // defines the starting active player -- usually player one
  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printRound = () => {
    Gameboard.printBoard();

    console.log(`${activePlayer.playerOneName} (${activePlayer.mark})'s turn`);
  };

  const dropMark = (row, column) => {
    const cell = Gameboard.getCell(row, column);

    if (cell.getValue() === "") {
      cell.setValue(activePlayer.mark);
    } else console.log(`Nothing happened`);

    switchPlayer();
  };

  const playRound = (row, column) => {
    dropMark(row, column);
    switchPlayer();
    printRound();
  };

  printRound();

  return { dropMark, switchPlayer };
}

const game = GameFlow();
game.dropMark(0, 2);
Gameboard.printBoard();
