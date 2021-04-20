import Piece from '../Piece';
import { PieceType } from '../../types';

class Queen extends Piece {
  constructor(color) {
    super(color, ['♛', '♕'], PieceType.queen);
  }
}

export default Queen;
