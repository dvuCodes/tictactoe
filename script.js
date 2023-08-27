"use strict";
import Cell from "./utils/Cell.js"

const boardContainerEl = document.getElementById('board-container')
let gameOver = false

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
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
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

    console.log(`${activePlayer.name} (${activePlayer.mark})'s turn`);
  };

  const checkWinner = (board, mark) => {
    // definie winning combinations
    const winningCombos = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    // iterate through winningCombos array to see if any combos are true
    const isWinning = winningCombos.some(combo => combo.every(([row, col]) => {
      const cell = board[row][col]
      return cell ? cell.getValue() === mark : false
    }))


    return isWinning
  }

  const dropMark = (row, column) => {
    const cell = Gameboard.getCell(row, column);
    const mark = cell.getValue();
    const activePlayerMark = activePlayer.mark;

    if (mark === "") {
      cell.setValue(activePlayerMark);
      switchPlayer();
    } else return alert('This spot is already taken')
  };


  return { dropMark, switchPlayer, printRound, checkWinner };
}

Gameboard.renderBoard()
const game = GameFlow();

// Iterating thorugh our cells and giving them the function to dropMark and DOM will update from the board array itself.
const cellEL = document.querySelectorAll('.cell');
cellEL.forEach(cell => cell.addEventListener('click', e => {
  const row = +(e.target.dataset.rows)
  const columns = +(e.target.dataset.columns)

  if(!gameOver) {
    game.dropMark(row, columns)
  }


  const selectedCell = Gameboard.getCell(row, columns);
  const mark = selectedCell.getValue()

  cell.textContent = mark
  if (game.checkWinner(Gameboard.getBoard(), mark)) {
    console.log(`Game Over!. The winner is ${game.activePlayer}`)
    gameOver = true
  }
}));

