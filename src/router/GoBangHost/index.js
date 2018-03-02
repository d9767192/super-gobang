import {
  addClickEventListener,
  removeClickEventListener,
  receivePropsHandler,
  shouldUpdate,
  isCanvasSupported,
} from '../../controllers/GoBangHost';
import GoBangHost from '../../views/GoBangHost';
import { connect } from '../../hocs/connect';

export const method = () => ({
  addClickEventListener,
  removeClickEventListener,
  receivePropsHandler,
  shouldUpdate: (nextState, state) => shouldUpdate(nextState, state),
  isCanvasSupported,
});

export default connect(method)(GoBangHost);
