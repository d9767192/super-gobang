import {
  addClickEventListener,
  removeClickEventListener,
  receivePropsHandler,
  shouldUpdate,
} from '../../controllers/GoBangHost';
import GoBangHost from '../../views/GoBangHost';
import { connect } from '../../hocs/connect';

export const method = () => ({
  addClickEventListener,
  removeClickEventListener,
  receivePropsHandler,
  shouldUpdate: (nextState, state) => shouldUpdate(nextState, state),
});

export default connect(method)(GoBangHost);
