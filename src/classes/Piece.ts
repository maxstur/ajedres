import Cell from './Cell';
import { Color, PieceType } from '../types';

class Piece {
  color: Color;
  miau: string[];
  type: PieceType;

  constructor(color, miau, type) {
    this.color = color;
    this.miau = miau;
    this.type = type;
  }

  // eslint-disable-next-line no-unused-vars
  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    throw new Error(`Missing availableMovements in ${this.type}`);
  }
}

export default Piece;
