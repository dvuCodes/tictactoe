"use strict";
import Cell from "./utils/Cell.js"

const boardContainerEl = document.getElementById('board-container')

// function to render the gameboard
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // renders 3x3 grid in our board array
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // render cells onto DOM
  const renderBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.dataset.rows = i;
        newCell.dataset.columns = j
        boardContainerEl.appendChild(newCell);

      }
    }
  };

  // method to find the cell at a given row and column
  const getCell = (row, columns) => board[row][columns];

  const getBoard = () => board;

  const printBoard = () => {
    const boardMappedWithValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardMappedWithValues);
  };

  return { getBoard, printBoard, getCell, renderBoard };
})();

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
    const mark = cell.getValue();
    const activePlayerMark = activePlayer.mark;

    if (mark === "") {
      cell.setValue(activePlayerMark);
      switchPlayer();
    } else return alert('This spot is already taken')
  };

  const playRound = (row, column) => {
    dropMark(row, column);
    switchPlayer();
    printRound();
  };

  printRound();

  return { dropMark, switchPlayer };
}

Gameboard.renderBoard()
const game = GameFlow();

// Iterating thorugh our cells and giving them the function to dropMark and DOM will update from the board array itself.
const cellEL = document.querySelectorAll('.cell');
cellEL.forEach(cell => cell.addEventListener('click', e => {
  const row = +(e.target.dataset.rows)
  const columns = +(e.target.dataset.columns)

  game.dropMark(row, columns)

  const selectedCell = Gameboard.getCell(row, columns);
  const mark = selectedCell.getValue()

  cell.textContent = mark
}));

