import { detectChessMovesChange, detectWidthChange } from '../../controllers/DivPieces';
import DivPieces from '../../views/DivPieces';
import { connect } from '../../hocs/connect';

export const method = () => ({
  detectChessMovesChange,
  detectWidthChange,
});

export default connect(method)(DivPieces);
