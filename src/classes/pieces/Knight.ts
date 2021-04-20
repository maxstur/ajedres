import Piece from '../Piece';
import { PieceType } from '../../types';

class Knight extends Piece {
  constructor(color) {
    super(color, ['♞', '♘'], PieceType.knight);
  }
}

export default Knight;
