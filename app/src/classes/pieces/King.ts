import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class King extends Piece {
  constructor(color) {
    super(color, ['♚', '♔'], PieceType.king);
  }

  isCastling(position: [number, number]) {
    const [x, y] = position;
    return (y === 7 && (x === 6 || x === 2));
  }

  castle(position: [number, number], boardMatrix: Cell[][]) {
    const [x] = position;
    if (x === 6) {
      const rookCell = boardMatrix[7][7];
      boardMatrix[5][7].setPiece(rookCell.piece);
      rookCell.setPiece(null);
    } else if (x === 2) {
      const rookCell = boardMatrix[0][7];
      boardMatrix[3][7].setPiece(rookCell.piece);
      rookCell.setPiece(null);
    }
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    const [x, y] = position;
    const directions = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    directions.forEach((dir) => {
      const [xDir, yDir] = dir;
      const cell = this.getCellFromCoords([x + (1 * xDir), y + (1 * yDir)], boardMatrix);
      if (this.validCell(cell)) cell.setAvailableMovement(true);
    });

    if (this.moved) return;

    const cellCastlingKingSide1 = this.getCellFromCoords([x + 1, y], boardMatrix);
    const cellCastlingKingSide2 = this.getCellFromCoords([x + 2, y], boardMatrix);
    const cellCastlingKingSideRook = this.getCellFromCoords([x + 3, y], boardMatrix);
    if (
      !cellCastlingKingSide1.piece
      && !cellCastlingKingSide2.piece
      && cellCastlingKingSideRook.piece
      && cellCastlingKingSideRook.piece.type === PieceType.rook
      && !cellCastlingKingSideRook.piece.moved
    ) {
      cellCastlingKingSide2.setAvailableMovement(true);
    }

    const cellCastlingQueenSide1 = this.getCellFromCoords([x - 1, y], boardMatrix);
    const cellCastlingQueenSide2 = this.getCellFromCoords([x - 2, y], boardMatrix);
    const cellCastlingQueenSide3 = this.getCellFromCoords([x - 3, y], boardMatrix);
    const cellCastlingQueenSideRook = this.getCellFromCoords([x - 4, y], boardMatrix);
    if (
      !cellCastlingQueenSide1.piece
      && !cellCastlingQueenSide2.piece
      && !cellCastlingQueenSide3.piece
      && cellCastlingQueenSideRook.piece
      && cellCastlingQueenSideRook.piece.type === PieceType.rook
      && !cellCastlingQueenSideRook.piece.moved
    ) {
      cellCastlingQueenSide2.setAvailableMovement(true);
    }
  }
}

export default King;
