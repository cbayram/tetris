import { parseMoves, Tetris, tetrominos } from "client_server_shared/tetris";

describe("parseMoves", () => {
  it("parses empty moves string", () => {
    const moves = parseMoves("");
    expect(moves.length).toBe(0);
  });

  it("parses invalid moves string as empty", () => {
    const moves = parseMoves("X1,Y10, abdegibrish ,...");
    expect(moves.length).toBe(0);
  });

  it("parses a single move", () => {
    const [Q1] = parseMoves("Q1");
    expect(Q1).toEqual({
      letter: "Q",
      tetromino: tetrominos.Q,
      column: 1,
    });
  });

  it("parses multiple moves", () => {
    const [Q1, Q1_2, Z2, S3, T4, I5, I6, I7, L8, J9] = parseMoves(
      "Q1,Q1,Z2,S3,T4,I5,I6,I7,L8,J9"
    );
    expect(Q1).toEqual({
      letter: "Q",
      tetromino: tetrominos.Q,
      column: 1,
    });
    expect(Q1_2).toEqual({
      letter: "Q",
      tetromino: tetrominos.Q,
      column: 1,
    });
    expect(Z2).toEqual({
      letter: "Z",
      tetromino: tetrominos.Z,
      column: 2,
    });
    expect(S3).toEqual({
      letter: "S",
      tetromino: tetrominos.S,
      column: 3,
    });
    expect(T4).toEqual({
      letter: "T",
      tetromino: tetrominos.T,
      column: 4,
    });
    expect(I5).toEqual({
      letter: "I",
      tetromino: tetrominos.I,
      column: 5,
    });
    expect(I6).toEqual({
      letter: "I",
      tetromino: tetrominos.I,
      column: 6,
    });
    expect(I7).toEqual({
      letter: "I",
      tetromino: tetrominos.I,
      column: 7,
    });
    expect(L8).toEqual({
      letter: "L",
      tetromino: tetrominos.L,
      column: 8,
    });
    expect(J9).toEqual({
      letter: "J",
      tetromino: tetrominos.J,
      column: 9,
    });
  });

  it("parses multiple moves with arbitrary delimeters and out of bound column indices", () => {
    const [Q1, Q1_2, Z2, S3, T4, I5, I6, I7, L8, J0] = parseMoves(
      "Q1, Q1 Z2,,,S3\nT4_I5\tI6\r\nI7,L8,J100"
    );
    expect(Q1).toEqual({
      letter: "Q",
      tetromino: tetrominos.Q,
      column: 1,
    });
    expect(Q1_2).toEqual({
      letter: "Q",
      tetromino: tetrominos.Q,
      column: 1,
    });
    expect(Z2).toEqual({
      letter: "Z",
      tetromino: tetrominos.Z,
      column: 2,
    });
    expect(S3).toEqual({
      letter: "S",
      tetromino: tetrominos.S,
      column: 3,
    });
    expect(T4).toEqual({
      letter: "T",
      tetromino: tetrominos.T,
      column: 4,
    });
    expect(I5).toEqual({
      letter: "I",
      tetromino: tetrominos.I,
      column: 5,
    });
    expect(I6).toEqual({
      letter: "I",
      tetromino: tetrominos.I,
      column: 6,
    });
    expect(I7).toEqual({
      letter: "I",
      tetromino: tetrominos.I,
      column: 7,
    });
    expect(L8).toEqual({
      letter: "L",
      tetromino: tetrominos.L,
      column: 8,
    });
    expect(J0).toEqual({
      letter: "J",
      tetromino: tetrominos.J,
      column: 0,
    });
  });
});

describe("Tetris", () => {
  // copied over from input file provided
  const testCases = [
    { input: "Q0", expectedHeight: 2 },
    { input: "Q0,Q1", expectedHeight: 4 },
    { input: "Q0,Q2,Q4,Q6,Q8", expectedHeight: 0 },
    { input: "Q0,Q2,Q4,Q6,Q8,Q1", expectedHeight: 2 },
    { input: "Q0,Q2,Q4,Q6,Q8,Q1,Q1", expectedHeight: 4 },
    { input: "I0,I4,Q8", expectedHeight: 1 },
    { input: "I0,I4,Q8,I0,I4", expectedHeight: 0 },
    { input: "L0,J2,L4,J6,Q8", expectedHeight: 2 },
    { input: "L0,Z1,Z3,Z5,Z7", expectedHeight: 2 },
    { input: "T0,T3", expectedHeight: 2 },
    { input: "T0,T3,I6,I6", expectedHeight: 1 },
    { input: "I0,I6,S4", expectedHeight: 1 },
    { input: "T1,Z3,I4", expectedHeight: 4 },
    { input: "L0,J3,L5,J8,T1", expectedHeight: 3 },
    { input: "L0,J3,L5,J8,T1,T6", expectedHeight: 1 },
    { input: "L0,J3,L5,J8,T1,T6,J2,L6,T0,T7", expectedHeight: 2 },
    { input: "L0,J3,L5,J8,T1,T6,J2,L6,T0,T7,Q4", expectedHeight: 1 },
    { input: "S0,S2,S4,S6", expectedHeight: 8 },
    { input: "S0,S2,S4,S5,Q8,Q8,Q8,Q8,T1,Q1,I0,Q4", expectedHeight: 8 },
    { input: "L0,J3,L5,J8,T1,T6,S2,Z5,T0,T7", expectedHeight: 0 },
    { input: "Q0,I2,I6,I0,I6,I6,Q2,Q4", expectedHeight: 3 },
  ];

  testCases.forEach(({ input, expectedHeight }) => {
    it(`computes height for moves ${input}`, () => {
      const game = Tetris.newGame();
      parseMoves(input).forEach((move) => game.playMove(move));
      expect(game.height).toEqual(expectedHeight);
    });
  });
});
