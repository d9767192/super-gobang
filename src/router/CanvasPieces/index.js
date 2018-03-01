import { detectChessMovesChange, detectWidthChange } from '../../controllers/CanvasPieces';
import CanvasPieces from '../../views/CanvasPieces';
import { connect } from '../../hocs/connect';

export const method = props => ({
  detectChessMovesChange: (canvas, nextProps) => detectChessMovesChange(canvas, nextProps, props),
  detectWidthChange: (canvas, prevProps) => detectWidthChange(canvas, props, prevProps),
});

export default connect(method)(CanvasPieces);
