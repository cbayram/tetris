import {
  COLUMN_COUNT,
  parseMoves,
  Tetris,
  TetrominoLetter,
} from "client_server_shared/tetris";

/**
 * This file contains browser-specific methods requiring DOM access.
 */

const tetrominoColors: Record<TetrominoLetter, string> = {
  Q: "gold",
  Z: "red",
  S: "green",
  T: "purple",
  I: "cyan",
  L: "orange",
  J: "blue",
};

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const MIN_CANVAS_HEIGHT = canvas.height;
const BLOCK_SIZE = canvas.width / COLUMN_COUNT;

function renderGame(game: Tetris): void {
  // reset the height of the canvas based on game height
  const canvasHeight = Math.max(
    (game.height + 2) * BLOCK_SIZE,
    MIN_CANVAS_HEIGHT
  );
  canvas.height = canvasHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the game blocks from bottom up
  for (let row = 0; row < game.height; row++) {
    for (let column = 0; column < COLUMN_COUNT; column++) {
      const blockLetter = game.board[row][column];
      if (blockLetter) {
        context.fillStyle = tetrominoColors[blockLetter];
        context.fillRect(
          column * BLOCK_SIZE,
          canvasHeight - (row + 1) * BLOCK_SIZE,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1
        );
      }
    }
  }
  // print out the height of the remaining blocks
  context.fillStyle = "black";
  context.font = `${BLOCK_SIZE}px Verdana`;
  context.fillText(`Height: ${game.height}`, 0, BLOCK_SIZE);
}

export function parseMovesAndRenderGame(event: SubmitEvent): void {
  event.preventDefault();
  const movesAsString = (
    document.getElementById("moves-input") as HTMLInputElement
  ).value;

  const game = Tetris.newGame();
  parseMoves(movesAsString).forEach((move) => game.playMove(move));
  renderGame(game);
}

// Expose parseMovesAndRenderGame via the window global
window.parseMovesAndRenderGame = parseMovesAndRenderGame;
