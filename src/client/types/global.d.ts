export {};

declare global {
  interface Window {
    parseMovesAndRenderGame: (event: SubmitEvent) => void;
  }
}
