const gameBoard = document.getElementById("gameBoard");
const cells = Array.from(document.querySelectorAll(".cell"));
const restartButton = document.getElementById("restartButton");
let board = ["", "", "", "", "", "", "", "", ""];
const humanPlayer = "X";
const computerPlayer = "O";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === player);
  });
}

function checkDraw() {
  return board.every((cell) => cell);
}

function handleClick(event) {
  const cell = event.target;
  const index = cells.indexOf(cell);

  if (board[index] !== "" || checkWin(humanPlayer) || checkWin(computerPlayer))
    return;

  board[index] = humanPlayer;
  cell.textContent = humanPlayer;

  if (checkWin(humanPlayer)) {
    setTimeout(() => alert("You win!"), 100);
    return;
  }

  if (checkDraw()) {
    setTimeout(() => alert("It's a draw!"), 100);
    return;
  }

  computerMove();
}

function computerMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = computerPlayer;
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  board[bestMove] = computerPlayer;
  cells[bestMove].textContent = computerPlayer;

  if (checkWin(computerPlayer)) {
    setTimeout(() => alert("Computer wins!"), 100);
  }

  if (checkDraw()) {
    setTimeout(() => alert("It's a draw!"), 100);
  }
}

function minimax(board, depth, isMaximizing) {
  if (checkWin(computerPlayer)) return 10;
  if (checkWin(humanPlayer)) return -10;
  if (checkDraw()) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = computerPlayer;
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = humanPlayer;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
