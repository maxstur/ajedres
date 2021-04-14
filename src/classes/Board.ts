import Cell from './Cell';
import { Theme } from '../types';

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

  selectedCellPosition: [number, number];

  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(width, height, files, ranks, theme, pieceTheme) {
    this.width = width;
    this.height = height;
    this.files = files;
    this.ranks = ranks;
    this.theme = theme;
    this.pieceTheme = pieceTheme;

    this.cellWidth = this.width / this.files;
    this.cellHeight = this.height / this.ranks;

    this.pieceOffset = this.cellHeight * 0.1;

    this.selectedCellPosition = null;

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

    // Mouse events
    this.$canvas.addEventListener('mousemove', this.setMouseCell);

    this.$canvas.addEventListener('mousedown', this.setSelectedCell);

    this.$canvas.addEventListener('mouseup', () => {
      console.log('Drop!');
    });
  }

  mouseCoordinatesToCell(x: number, y: number) {
    const file = Math.floor(x / this.cellWidth);
    const rank = Math.floor(y / this.cellHeight);
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
    for (let x = 0; x < this.files; x += 1) {
      for (let y = 0; y < this.ranks; y += 1) {
        let rectColor = this.theme.light;
        let textColor = this.theme.dark;

        if ((x + y) % 2) {
          rectColor = this.theme.dark;
          textColor = this.theme.light;
        }

        this.ctx.fillStyle = rectColor;
        this.ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);

        // Draw debug position
        this.ctx.fillStyle = textColor;
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'start';
        this.ctx.font = '8px Arial';
        this.ctx.fillText(`[${x};${y}]`, x * this.cellWidth + 10, y * this.cellHeight + 10);

        // Draw the piece
        const cell = this.boardMatrix[x][y];

        console.log({ cell });

        if (cell.selected) {
          this.ctx.fillStyle = '#FFDC4E';
          this.ctx.lineWidth = 8;
          this.ctx.lineJoin = 'bevel';
          this.ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
        }

        const piece = cell?.piece;

        if (piece) {
          this.ctx.fillStyle = piece.color;
          this.ctx.textBaseline = 'middle';
          this.ctx.textAlign = 'center';
          this.ctx.font = '72px Arial';
          this.ctx.fillStyle = piece.color;
          this.ctx.fillText(
            piece.type[0],
            x * this.cellWidth + this.cellWidth / 2,
            y * this.cellHeight + this.cellHeight / 2 + this.pieceOffset,
          );
          this.ctx.fillStyle = this.pieceTheme.dark;
          this.ctx.fillText(
            piece.type[1],
            x * this.cellWidth + this.cellWidth / 2,
            y * this.cellHeight + this.cellHeight / 2 + this.pieceOffset,
          );
        }
      }
    }
  }
}

export default Board;
