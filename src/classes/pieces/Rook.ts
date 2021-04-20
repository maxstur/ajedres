import Piece from '../Piece';
import { PieceType } from '../../types';

class Rook extends Piece {
  constructor(color) {
    super(color, ['♜', '♖'], PieceType.rook);
  }
}

export default Rook;
