"use strict";

// this is a module pattern (immediately invoked) for the gameboard
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let y = 0; y < columns; y++) {
      board[i].push(Cell());
    }
  }

  // method to get Gameboard
  const getBoard = () => board;

  // method to print game board
  const printBoard = () => {
    const mark = board.map((row) => row.map((cell) => cell.getMark()));
    console.log(mark);
  };

  return { getBoard, printBoard };
}

// function get mark and set the mark
function Cell() {
  let mark = "";

  const getMark = () => mark;

  const setMark = (newMark) => (mark = newMark);

  return { getMark, setMark };
}

// function to create the game flow

function GameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
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

  // play round player picks a cell
  // if cell === "" set setMark = (activePlayer.mark)

  const dropMark = (cell) => {
    if (cell === "") {
      cell.setMark(activePlayer.mark);
    }
  };

  const playRound = () => {
    console.log(`It's ${activePlayer.name}'s turn`);
    board.printBoard();
    dropMark();
    switchPlayers();
  };

  const printNewRound = () => board.printBoard();

  // prints new round when the game starts
  printNewRound();

  return { players, getActivePlayer, switchPlayers, board };
}

// function to add marks to a specific box and then tie it to the do

const game = GameFlow();
