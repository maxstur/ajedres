import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType, Color } from '../../types';

class Pawn extends Piece {
  constructor(color: Color) {
    super(color, ['♟', '♙'], PieceType.pawn);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    const yDirection = this.color === Color.dark ? 1 : -1;
    const [x, y] = position;
    for (let i = 1; i <= (this.moveCount > 0 ? 1 : 2); i += 1) {
      const cell = this.getCellFromCoords(
        [x, y + (i * yDirection)],
        boardMatrix,
      );
      if (cell.piece) break;
      cell.setAvailableMovement(true);
    }

    // Take left and right
    for (let i = 0; i < 2; i += 1) {
      const takeCell = this.getCellFromCoords(
        [x + (i ? 1 : -1), y + (1 * yDirection)],
        boardMatrix,
      );
      const takeCellAlt = this.getCellFromCoords(
        [x + (i ? 1 : -1), y],
        boardMatrix,
      );
      if (
        takeCell
        && takeCell.piece
        && takeCell.piece.color !== this.color
      ) takeCell.setAvailableMovement(true);
      if (
        takeCellAlt
        && takeCellAlt.piece
        && takeCellAlt.piece.color !== this.color
        && takeCellAlt.piece.type === PieceType.pawn
        && takeCellAlt.piece.moveCount === 1
      ) takeCell.setAvailableMovement(true);
    }
  }
}

export default Pawn;
