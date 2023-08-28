"use strict";
import Cell from "./src/utils/Cell.js";

const INITIAL_SCORE = {
  playerOne: 0,
  tie: 0,
  playerTwo: 0,
};

let GAMEOVER = false;

const boardContainerEl = document.getElementById("board-container");
const activeMarkerEl = document.getElementById("active-marker-el");
const winningMessageModalEl = document.getElementById("winner-message-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const xScoreEl = document.getElementById("x-score");
const tieScoreEl = document.getElementById("tie-score");
const oScoreEl = document.getElementById("o-score");

// function to update the score
const updateScore = (score) => {
  xScoreEl.textContent = score.playerOne;
  tieScoreEl.textContent = score.tie;
  oScoreEl.textContent = score.playerTwo;
};

// function to render the gameboard
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // renders 3x3 grid in our board array
  const renderBoardArray = () => {
    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  };

  renderBoardArray();

  const resetBoardArray = () => {
    while (board.length > 0) {
      board.pop();
    }
    renderBoardArray();
  };

  // render cells onto DOM
  const renderDOMBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.dataset.rows = i;
        newCell.dataset.columns = j;
        boardContainerEl.appendChild(newCell);
      }
    }
  };

  const resetBoard = () => {
    const cellEl = document.querySelectorAll(".cell");
    cellEl.forEach((cell) => (cell.textContent = ""));
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

  return {
    getBoard,
    printBoard,
    getCell,
    renderDOMBoard,
    resetBoard,
    resetBoardArray,
  };
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

  const getActivePlayer = () => activePlayer;

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
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    // iterate through winningCombos array to see if any combos are true
    const isWinning = winningCombos.some((combo) =>
      combo.every(([row, col]) => {
        const cell = board[row][col];
        return cell ? cell.getValue() === mark : false;
      })
    );

    return isWinning;
  };

  const dropMark = (row, column) => {
    const cell = Gameboard.getCell(row, column);
    const mark = cell.getValue();
    const activePlayerMark = activePlayer.mark;

    if (mark === "") {
      cell.setValue(activePlayerMark);
    } else return alert("This spot is already taken");
  };

  return { dropMark, switchPlayer, printRound, checkWinner, getActivePlayer };
}

Gameboard.renderDOMBoard();
const game = GameFlow();

// Iterating thorugh our cells and giving them the function to dropMark and DOM will update from the board array itself.
const cellEL = document.querySelectorAll(".cell");
cellEL.forEach((cell) =>
  cell.addEventListener("click", (e) => {
    const row = +e.target.dataset.rows;
    const columns = +e.target.dataset.columns;

    // disables players from dropping a new mark when the game over state is changed to true
    if (!GAMEOVER) {
      game.dropMark(row, columns);
    }

    const selectedCell = Gameboard.getCell(row, columns);
    const mark = selectedCell.getValue();

    if (mark === "O") {
      cell.style.color = "rgb(245, 212, 25)";
    }

    cell.textContent = mark;

    // dynamically changes the displayed active marker to the current players marker
    activeMarkerEl.textContent = game.getActivePlayer().mark;

    // checks for a winner
    if (game.checkWinner(Gameboard.getBoard(), mark)) {
      console.log(`Game Over!. The winner is ${game.getActivePlayer().name}`);
      GAMEOVER = true;
      winningMessageModalEl.classList.add("show");
      // resets board state
      Gameboard.resetBoardArray();
    }
    // if there game is not over, switch players
    if (!GAMEOVER) {
      game.switchPlayer();
    }

    if (GAMEOVER) {
      if (mark === "X") {
        INITIAL_SCORE.playerOne++;
        Gameboard.resetBoardArray();
      } else if (mark === "O") {
        INITIAL_SCORE.playerTwo++;
        Gameboard.resetBoardArray();
      } else {
        INITIAL_SCORE.tie++;
        Gameboard.renderBoardArray();
      }

      updateScore(INITIAL_SCORE);
    }
    // debug
    Gameboard.printBoard();
  })
);

closeModalBtn.addEventListener("click", () => {
  winningMessageModalEl.classList.remove("show");
  setTimeout(() => {
    Gameboard.resetBoard();
    GAMEOVER = false;
  }, 1000);
});
