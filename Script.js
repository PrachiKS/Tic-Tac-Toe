document.addEventListener("DOMContentLoaded", () => {
    let board = ["", "", "", "", "", "", "", "", ""]
    let currentPlayer ="x";
    let gameActive = true;
    let scores = {
        player: 0,
        computer: 0,
        ties: 0,
    };

    const boardElement = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const statusElement = document.getElementById("status");
    const restartBtn = document.getElementById("restart-btn");
    const playerScoreElement = document.getElementById("player-score");
    const computerScoreElement = document.getElementById("computer-score");
    const tiesElement = document.getElementById("ties");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],// columns
        [0, 4, 8],
        [2, 4, 6],// diadonals
    ];
});
