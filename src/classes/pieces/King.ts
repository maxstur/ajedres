import Piece from '../Piece';
import { PieceType } from '../../types';

class King extends Piece {
  constructor(color) {
    super(color, ['♚', '♔'], PieceType.king);
  }
}

export default King;
