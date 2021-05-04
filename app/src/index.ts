import Board from './classes/Board';
import Pawn from './classes/pieces/Pawn';
import Rook from './classes/pieces/Rook';
import Knight from './classes/pieces/Knight';
import Bishop from './classes/pieces/Bishop';
import Queen from './classes/pieces/Queen';
import King from './classes/pieces/King';

import socket from './helpers/socket';

import { Color, PieceType } from './types';

const WIDTH = 800;
const HEIGHT = 800;

const FILES = 8;
const RANKS = 8;

const theme = {
  light: '#eeeed2',
  dark: '#769656',
};

const pieceTheme = {
  light: '#FFFFFF',
  dark: '#000000',
};

const board = new Board(WIDTH, HEIGHT, FILES, RANKS, theme, pieceTheme);

socket.on('init board', (serverPieces) => {
  serverPieces.forEach((rank, y) => {
    rank.forEach((p, x) => {
      if (!p) return;
      const [colorType, pieceType = ''] = p.split('');
      const color = colorType === 'b' ? Color.dark : Color.light;

      console.log({ pieceType });

      let piece;

      if (pieceType === PieceType.pawn) piece = new Pawn(color);
      else if (pieceType === PieceType.rook) piece = new Rook(color);
      else if (pieceType === PieceType.knight) piece = new Knight(color);
      else if (pieceType === PieceType.bishop) piece = new Bishop(color);
      else if (pieceType === PieceType.queen) piece = new Queen(color);
      else if (pieceType === PieceType.king) piece = new King(color);

      board.initPlacePiece(x, y, piece);
    });
  });

  board.render();
});
