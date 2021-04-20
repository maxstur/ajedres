import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Bishop extends Piece {
  constructor(color) {
    super(color, ['♝', '♗'], PieceType.bishop);
  }

  checkDiagonal(position, movement, boardMatrix) {
    const [x, y] = position;
    const [xMov, yMov] = movement;
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = this.getCellFromCoords([x + (i * xMov), y + (i * yMov)], boardMatrix);
      if (!cell) break;
      if (cell.piece && cell.piece.color === this.color) break;
      cell.setAvailableMovement(true);
      if (cell.piece) break;
    }
  }
  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    // Down Right
    this.checkDiagonal(position, [1, 1], boardMatrix);

    // Down Left
    this.checkDiagonal(position, [-1, 1], boardMatrix);

    // Up Right
    this.checkDiagonal(position, [1, -1], boardMatrix);

    // Up Left
    this.checkDiagonal(position, [-1, -1], boardMatrix);
  }
}

export default Bishop;
