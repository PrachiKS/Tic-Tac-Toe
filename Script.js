document.addEventListener("DOMContentLoaded", () => {
    let board = ["", "", "", "", "", "", "", "", ""]
    let currentPlayer = "X";
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
    const playerScoreElement = document.getElementById("playerScore");
    const computerScoreElement = document.getElementById("computerScore");
    const tiesElement = document.getElementById("drawScore");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],// columns
        [0, 4, 8],
        [2, 4, 6],// diagonals
    ];

    cells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    restartBtn.addEventListener("click", restartGame)

    function handleCellClick(cell) {
        const index = cell.getAttribute("data-index");
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("x");

        if (checkWin()) {
            endGame(false);
            return;
        }

        if (checkDraw()) {
            endGame(true);
            return;
        }
        currentPlayer = "O";
        statusElement.textContent = "Computer's turn (O)";
        setTimeout(computerMove, 500);
    }

    function computerMove() {
        if (!gameActive) return;
        const bestMove = findBestMove();
        board[bestMove] = currentPlayer;
        cells[bestMove].textContent = currentPlayer;
        cells[bestMove].classList.add('o');
        if (checkWin()) {
            endGame(false);
            return;
        }

        if (checkDraw()) {
            endGame(true);
            return;
        }
        currentPlayer = "X"
        statusElement.textContent = "Your turn (X)";
    }

    function findBestMove() {
        // Try to win
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                if (checkWin()) {
                    board[i] = "";
                    return i;
                }
                board[i] = "";
            }
        }

        // block player from winning 

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";

                if (checkWin()) {
                    board[i] = "";
                    return i;
                }
                board[i] = "";
            }
        }

        // Try to take center 
        if (board[4] === "") return 4;

        // Try to take corners

        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter((corner) => board[corner] === "");
        if (availableCorners.length > 0) {
            return availableCorners[
                Math.floor(Math.random() * availableCorners.length)
            ];
        }

        // Take any Available edge

        const edges = [1, 3, 5, 7];
        const AvailableEdges = edges.filter((edge) => board[edge] === "");
        if (AvailableEdges.length > 0) {
            return AvailableEdges[Math.floor(Math.random() * AvailableEdges.length)];
        }

        // Take any available spot

        const availableMoves = board
            .map((cell, index) => (cell === "" ? index : null))
            .filter((cell) => cell !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function checkWin() {
        return winningCombinations.some((combination) => {
            return combination.every((index) => {
                return board[index] === currentPlayer;
            });

        });
    }

    function checkDraw() {
        return board.every((cell) => cell)
    }

    function updateScoreboard() {
    playerScoreElement.textContent = scores.player;
    computerScoreElement.textContent = scores.computer;
    tiesElement.textContent = scores.ties;
}

    function endGame(isDraw) {
    gameActive = false;
    restartBtn.classList.remove("hidden");

    if (isDraw) {
        statusElement.textContent = "It's a Draw!";
        scores.ties++;
    } else {
        if (currentPlayer === "X") {
            statusElement.textContent = "You Win!";
            scores.player++;
        } else {
            statusElement.textContent = "Computer Wins!";
            scores.computer++;
        }
    }
    updateScoreboard(); // Call the helper here
}

    function restartGame(){
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        statusElement.textContent = "Your Turn (X)";
        restartBtn.classList.add("hidden");

        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
        });
    }
});
