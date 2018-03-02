import { drawBoard, receiveProps, shouldUpdateChildren } from '../../controllers/DivChessBoard';
import DivChessBoard from '../../views/DivChessBoard';
import { connect } from '../../hocs/connect';

export const method = () => ({
  drawBoard,
  receiveProps,
  shouldUpdateChildren,
});

export default connect(method)(DivChessBoard);

