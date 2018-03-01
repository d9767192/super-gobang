import { drawBoard } from '../../controllers/CanvasChessBoard';
import CanvasChessBoard from '../../views/CanvasChessBoard';
import { connect } from '../../hocs/connect';

export const method = props => ({
  drawBoard: chessboard => drawBoard(chessboard, props),
});

export default connect(method)(CanvasChessBoard);
