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
      const cell = boardMatrix[x + i][y + i];
      if (!cell) break;
      if (cell.piece) break;
      console.log(x, y, i, cell);
      cell.setAvailableMovement(true);
    }

    // Down Left
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = boardMatrix[x - i][y + i];
      if (!cell) break;
      if (cell.piece) break;
      console.log(x, y, i, cell);
      cell.setAvailableMovement(true);
    }

    // Up Right
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = boardMatrix[x + i][y - i];
      if (!cell) break;
      if (cell.piece) break;
      console.log(x, y, i, cell);
      cell.setAvailableMovement(true);
    }

    // Up Left
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = boardMatrix[x - i][y - i];
      if (!cell) break;
      if (cell.piece) break;
      console.log(x, y, i, cell);
      cell.setAvailableMovement(true);
    }
  }
}

export default Bishop;
