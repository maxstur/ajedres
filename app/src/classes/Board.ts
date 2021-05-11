import Cell from './Cell';
import { Color, PieceType, Theme } from '../types';
import King from './pieces/King';

import socket from '../helpers/socket';

class Board {
  width: number;
  height: number;
  files: number;
  ranks: number;
  theme: Theme;
  pieceTheme: Theme;

  cellWidth: number;
  cellHeight: number;
  pieceOffset: number;
  boardMatrix: Cell[][];

  disabled: boolean;
  isBlack: boolean;

  previousCellXY: [number, number] | null;
  previousCell: Cell;
  selectedCells: Cell[];

  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(width, height, files, ranks, theme, pieceTheme) {
    this.width = width;
    this.height = height;
    this.files = files;
    this.ranks = ranks;
    this.theme = theme;
    this.pieceTheme = pieceTheme;

    this.disabled = true;
    this.isBlack = false;

    this.cellWidth = this.width / this.files;
    this.cellHeight = this.height / this.ranks;

    this.pieceOffset = this.cellHeight * 0.1;

    this.previousCell = null;
    this.previousCellXY = null;
    this.selectedCells = [];

    this.$canvas = document.createElement('canvas');
    this.ctx = this.$canvas.getContext('2d');

    this.$canvas.width = this.width;
    this.$canvas.height = this.height;

    document.body.appendChild(this.$canvas);

    document.body.style.display = 'grid';
    document.body.style.placeItems = 'center';
    document.body.style.height = '100%';
    document.body.parentElement.style.height = '100%';
    document.body.style.backgroundColor = '#333333';

    // Initialize board
    this.boardMatrix = [];
    for (let x = 0; x < this.files; x += 1) {
      this.boardMatrix[x] = [];
      for (let y = 0; y < this.ranks; y += 1) {
        this.boardMatrix[x][y] = new Cell(null);
      }
    }

    // Bind methods
    this.setSelectedCell = this.setSelectedCell.bind(this);
    this.setMouseCell = this.setMouseCell.bind(this);
    this.pickPiece = this.pickPiece.bind(this);
    this.dragPiece = this.dragPiece.bind(this);
    this.dropPiece = this.dropPiece.bind(this);
    this.onSocketMove = this.onSocketMove.bind(this);
    this.onSocketTeToca = this.onSocketTeToca.bind(this);
    this.onSocketSosBlack = this.onSocketSosBlack.bind(this);

    // Mouse events
    this.$canvas.addEventListener('mousemove', this.dragPiece);

    this.$canvas.addEventListener('mousedown', this.pickPiece);

    this.$canvas.addEventListener('mouseup', this.dropPiece);

    // Socket events

    socket.on('move', this.onSocketMove);
    socket.on('te toca', this.onSocketTeToca);
    socket.on('sos black', this.onSocketSosBlack);
  }

  onSocketMove([prev, next]) {
    const [xPrev, yPrev] = prev;
    const [xNext, yNext] = next;

    this.clearSelections();

    const selectedCell = this.boardMatrix[xNext][yNext];
    const previousCell = this.boardMatrix[xPrev][yPrev];

    selectedCell.setPiece(previousCell.piece);

    this.selectedCells.push(selectedCell);
    this.selectedCells.push(previousCell);

    previousCell.piece.moved = true;
    previousCell.setPiece(null);
    previousCell.setSelected(true);
    this.previousCell = null;
    selectedCell.setSelected(true);

    this.disabled = true;

    this.clearAvailableMoves();
    this.render();
  }

  onSocketTeToca() {
    this.disabled = false;
  }

  onSocketSosBlack() {
    this.isBlack = true;
    this.render();
  }

  clearSelections() {
    this.selectedCells.forEach((c) => c.setSelected(false));
    this.selectedCells = [];
  }

  clearAvailableMoves() {
    this.boardMatrix.forEach((file) => {
      file.forEach((cell) => {
        cell.setAvailableMovement(false);
      });
    });
  }

  pickPiece(event: MouseEvent) {
    if (this.disabled) return;
    this.clearSelections();
    this.clearAvailableMoves();
    if (this.previousCell) return;
    const { offsetX, offsetY } = event;
    const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
    const selectedCell = this.boardMatrix[file][rank];
    if (!selectedCell.piece) return;
    if (this.isBlack && selectedCell.piece.color === Color.light) return;
    if (!this.isBlack && selectedCell.piece.color === Color.dark) return;

    selectedCell.piece.availableMovements([file, rank], this.boardMatrix);

    this.previousCellXY = [file, rank];
    this.previousCell = selectedCell;
    this.selectedCells.push(selectedCell);
    selectedCell.setSelected(true);
    this.render();
  }

  dragPiece(event: MouseEvent) {
    // console.log({ drag: this.selectedPiece });
  }

  dropPiece(event: MouseEvent) {
    if (!this.previousCell) return;
    const { offsetX, offsetY } = event;
    const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
    const selectedCell = this.boardMatrix[file][rank];

    if (this.previousCell === selectedCell) {
      console.log('Show valid movements');
      this.previousCell = null;
      this.clearSelections();
      this.render();
      return;
    }

    if (!selectedCell.availableMove) {
      this.previousCell = null;
      this.render();
      return;
    }

    socket.emit('move', [this.previousCellXY, [file, rank]]);
  }

  mouseCoordinatesToCell(x: number, y: number) {
    let file = Math.floor(x / this.cellWidth);
    let rank = Math.floor(y / this.cellHeight);

    if (this.isBlack) {
      file = this.files - 1 - file;
      rank = this.ranks - 1 - rank;
    }

    return [file, rank];
  }

  setSelectedCell(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
    const selectedCell = this.boardMatrix[file][rank];
    selectedCell.setSelected(true);
    this.render();
  }

  setMouseCell(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    console.log({ offsetX, offsetY });
    const x = Math.floor(offsetX / this.cellWidth);
    const y = Math.floor(offsetY / this.cellHeight);
    console.log({ cellWidth: this.cellWidth, cellHeight: this.cellHeight });
    console.log({ x, y });
    // const selectedCell = this.boardMatrix[x][y];
    // selectedCell.setSelected(true);
    // console.log(this.boardMatrix);
    // this.render();
  }

  initPlacePiece(x, y, piece) {
    const cell = this.boardMatrix[x][y];
    cell.setPiece(piece);
  }

  render() {
    console.log(this.boardMatrix);
    for (let x = 0; x < this.files; x += 1) {
      for (let y = 0; y < this.ranks; y += 1) {
        let drawX = x;
        let drawY = y;

        if (this.isBlack) {
          drawX = this.ranks - 1 - drawX;
          drawY = this.files - 1 - drawY;
        }

        let rectColor = this.theme.light;
        let textColor = this.theme.dark;

        if ((drawX + drawY) % 2) {
          rectColor = this.theme.dark;
          textColor = this.theme.light;
        }

        this.ctx.fillStyle = rectColor;
        this.ctx.fillRect(
          drawX * this.cellWidth,
          drawY * this.cellHeight,
          this.cellWidth,
          this.cellHeight,
        );

        // Draw the piece
        const cell = this.boardMatrix[x][y];

        if (cell.selected) {
          this.ctx.fillStyle = '#FFDC4E';
          this.ctx.globalAlpha = 0.8;
          this.ctx.fillRect(
            drawX * this.cellWidth,
            drawY * this.cellHeight,
            this.cellWidth,
            this.cellHeight,
          );
          this.ctx.globalAlpha = 1;
        }

        if (cell.availableMove) {
          this.ctx.fillStyle = '#000000';
          this.ctx.globalAlpha = 0.15;
          this.ctx.beginPath();
          this.ctx.arc(
            drawX * this.cellWidth + this.cellWidth / 2,
            drawY * this.cellHeight + this.cellHeight / 2,
            16,
            0,
            2 * Math.PI,
          );
          this.ctx.fill();
          this.ctx.globalAlpha = 1;
        }

        // Draw debug position
        this.ctx.fillStyle = textColor;
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'start';
        this.ctx.font = '8px Arial';
        this.ctx.fillText(`[${x};${y}]`, drawX * this.cellWidth + 10, drawY * this.cellHeight + 10);

        const piece = cell?.piece;

        if (piece) {
          this.ctx.fillStyle = this.pieceTheme[piece.color];
          this.ctx.textBaseline = 'middle';
          this.ctx.textAlign = 'center';
          this.ctx.font = '72px Arial';
          this.ctx.fillStyle = piece.color;
          this.ctx.fillText(
            piece.miau[0],
            drawX * this.cellWidth + this.cellWidth / 2,
            drawY * this.cellHeight + this.cellHeight / 2 + this.pieceOffset,
          );
          this.ctx.fillStyle = this.pieceTheme.dark;
          this.ctx.fillText(
            piece.miau[1],
            drawX * this.cellWidth + this.cellWidth / 2,
            drawY * this.cellHeight + this.cellHeight / 2 + this.pieceOffset,
          );
        }
      }
    }
  }
}

export default Board;
