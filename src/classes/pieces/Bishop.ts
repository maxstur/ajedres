import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Bishop extends Piece {
  constructor(color) {
    super(color, ['♝', '♗'], PieceType.bishop);
  }
  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    const [x, y] = position;
    // Down Right
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = this.getCellFromCoords([x + i, y + i], boardMatrix);
      if (!cell) break;
      if (cell.piece && cell.piece.color === this.color) break;
      cell.setAvailableMovement(true);
      if (cell.piece) break;
    }

    // Down Left
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = this.getCellFromCoords([x - i, y + i], boardMatrix);
      if (!cell) break;
      if (cell.piece && cell.piece.color === this.color) break;
      cell.setAvailableMovement(true);
      if (cell.piece) break;
    }

    // Up Right
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = this.getCellFromCoords([x + i, y - i], boardMatrix);
      if (!cell) break;
      if (cell.piece && cell.piece.color === this.color) break;
      cell.setAvailableMovement(true);
      if (cell.piece) break;
    }

    // Up Left
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = this.getCellFromCoords([x - i, y - i], boardMatrix);
      if (!cell) break;
      if (cell.piece && cell.piece.color === this.color) break;
      cell.setAvailableMovement(true);
      if (cell.piece) break;
    }
  }
}

export default Bishop;
