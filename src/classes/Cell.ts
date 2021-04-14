import Piece from './Piece';

class Cell {
  piece: Piece;
  selected: boolean;

  constructor(piece: Piece) {
    this.piece = piece;
    this.selected = false;
  }

  setSelected(selected: boolean) {
    this.selected = selected;
  }

  setPiece(piece: Piece) {
    this.piece = piece;
  }
}

export default Cell;
