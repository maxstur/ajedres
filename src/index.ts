import Board from './classes/Board';
import Piece from './classes/Piece';

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

const pieces = {
  king: ['♚', '♔'],
  queen: ['♛', '♕'],
  rook: ['♜', '♖'],
  bishop: ['♝', '♗'],
  knight: ['♞', '♘'],
  pawn: ['♟', '♙'],
};

// Ubicar las piezas
for (let i = 0; i < RANKS; i += 1) {
  board.initPlacePiece(i, 1, new Piece(pieces.pawn, pieceTheme.dark));
  board.initPlacePiece(i, 6, new Piece(pieces.pawn, pieceTheme.light));
}

for (let i = 0; i < 2; i += 1) {
  board.initPlacePiece(0, i * 7, new Piece(pieces.rook, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(7, i * 7, new Piece(pieces.rook, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(1, i * 7, new Piece(pieces.bishop, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(6, i * 7, new Piece(pieces.bishop, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(2, i * 7, new Piece(pieces.knight, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(5, i * 7, new Piece(pieces.knight, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(3, i * 7, new Piece(pieces.queen, i ? pieceTheme.light : pieceTheme.dark));
  board.initPlacePiece(4, i * 7, new Piece(pieces.king, i ? pieceTheme.light : pieceTheme.dark));
}

board.render();
