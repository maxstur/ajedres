import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType, Color } from '../../types';

class Pawn extends Piece {
  constructor(color: Color) {
    super(color, ['♟', '♙'], PieceType.pawn);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    const [x, y] = position;
    for (let i = 1; i <= 2; i += 1) {
      console.log(i);
      const cell = boardMatrix[x][this.color === Color.dark ? y + i : y - i];
      if (cell.piece) break;
      cell.setAvailableMovement(true);
    }
  }
}

export default Pawn;
