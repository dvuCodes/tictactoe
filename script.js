"use strict";

// render the boxes 3x3
// this is a module pattern

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

  const getBoard = () => board;

  const printBoard = () => {
    console.log(board);
  };

  return { board, getBoard, printBoard };
}

// function to add marks to a specific box and then tie it to the dom

function Cell() {
  const mark = "";

  const getMark = () => mark;

  const setMark = (player) => {
    const mark = player;
  };

  return { getMark, setMark };
}

function gameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = Gameboard();

  // define the players and their marks
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
    
    const switchPlayers = () => { 
        const currentPlayer
}

const game = Gameboard();
game.printBoard();
