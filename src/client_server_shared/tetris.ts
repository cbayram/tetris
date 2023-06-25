/**
 * This file contains code that can run on the client-side and the server-side.
 * This is useful for re-use and testing purposes.
 */

export type TetrominoLetter = "Q" | "Z" | "S" | "T" | "I" | "L" | "J";
type Grid = Array<Array<0 | TetrominoLetter>>;
type Tetromino = Grid;

type Move = { letter: TetrominoLetter; tetromino: Tetromino; column: number };

export const COLUMN_COUNT = 10;

const tetrominoLetters: Array<TetrominoLetter> = [
  "Q",
  "Z",
  "S",
  "T",
  "I",
  "L",
  "J",
];
const [Q, Z, S, T, I, L, J] = tetrominoLetters;
export const tetrominos: Record<TetrominoLetter, Tetromino> = {
  Q: [
    [Q, Q],
    [Q, Q],
  ],
  Z: [
    [Z, Z, 0],
    [0, Z, Z],
  ],
  S: [
    [0, S, S],
    [S, S, 0],
  ],
  T: [
    [T, T, T],
    [0, T, 0],
  ],
  I: [[I, I, I, I]],
  L: [
    [L, 0],
    [L, 0],
    [L, L],
  ],
  J: [
    [0, J],
    [0, J],
    [J, J],
  ],
};

export function parseMoves(moves: string): Array<Move> {
  // Strictness/forgiveness in parsing could vary depending on requirements
  // This could simply be a comma delimiter split, reporting/rejecting any errors
  const matches = moves.matchAll(
    new RegExp(`([${tetrominoLetters.join("")}])(\\d+)`, "igm")
  );
  const parsedMoves: Array<Move> = [];
  for (const match of matches) {
    const letter = match[1].toUpperCase() as TetrominoLetter;
    parsedMoves.push({
      letter,
      tetromino: tetrominos[letter],
      column: parseInt(match[2], 10) % COLUMN_COUNT,
    });
  }
  return parsedMoves;
}

// In order to maintain the board state, made this into a class.
// Alternatively, we could split off all these methods of this class as stand-alone functions
// which take in a the board state.
export class Tetris {
  // The board stores the tetris board with the bottom row being first and top row being last.
  // Note this is opposite of how the tetrominos are stored; top first, bottom last.
  // This maps to how I visualized the two structs.
  // However, we could iterate this code to ensure the row order is consistent.
  readonly board: Grid;
  private constructor() {
    this.board = [];
  }

  // The height is the board row length because we only store non-empty rows in board.
  get height(): number {
    return this.board.length;
  }

  playMove({ tetromino, column }: Move): void {
    // start at row above the top board row
    for (let row = this.height; row >= -1; row--) {
      if (!this.isPlacementValid(tetromino, row, column)) {
        row++;
        this.placeTetromino(tetromino, row, column);
        break;
      }
    }
  }

  private isPlacementValid(
    tetromino: Move["tetromino"],
    row: number,
    column: number
  ): boolean {
    // cycle bottom to top
    for (let tRow = tetromino.length - 1; tRow >= 0; tRow--) {
      // unlike tetromino, board row representation starts with bottom row and ends with top row
      const bRow = row + tetromino.length - 1 - tRow;
      if (bRow >= this.height) {
        return true;
      } else if (bRow < 0) {
        return false;
      }
      for (let tColumn = 0; tColumn < tetromino[tRow].length; tColumn++) {
        const bColumn = column + tColumn;
        // if the board and the tetromino have conflicting non-zero/filled values
        if (this.board[bRow][bColumn] && tetromino[tRow][tColumn]) {
          return false;
        }
      }
    }
    return true;
  }

  private placeTetromino(
    tetromino: Move["tetromino"],
    row: number,
    column: number
  ): void {
    // tetromino row representation starts with top and ends with bottom row
    // cycle bottom to top
    for (let tRow = tetromino.length - 1, rowStart = row; tRow >= 0; tRow--) {
      // unlike tetromino, board row representation starts with bottom row and ends with top row
      const bRow = rowStart + tetromino.length - 1 - tRow;
      const isNewRow = bRow === this.height;
      if (isNewRow) {
        // add new row
        this.board.push(Array.from({ length: COLUMN_COUNT }, () => 0));
      }
      for (let tColumn = 0; tColumn < tetromino[tRow].length; tColumn++) {
        const bColumn = column + tColumn;
        const tetrominoBlockValue = tetromino[tRow][tColumn];
        // we only copy non-zero tetromino blocks to the board to avoid overwriting
        if (tetrominoBlockValue) {
          // board block is assumed to be 0 here because of isPlacementValid check
          this.board[bRow][bColumn] = tetrominoBlockValue;
        }
      }
      // if the row is not new and if all blocks in row are non-zero/filled, evict row
      if (!isNewRow && this.board[bRow].every((x) => x)) {
        this.board.splice(bRow, 1);
        rowStart--;
      }
    }
  }

  static newGame(): Tetris {
    return new Tetris();
  }
}
