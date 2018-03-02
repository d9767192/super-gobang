import { addScreenListener, removeScreenListener, updateChildren } from '../../controllers/ResponsiveContainer';
import ResponsiveContainer from '../../views/ResponsiveContainer';
import { connect } from '../../hocs/connect';

export const method = () => ({
  addScreenListener,
  removeScreenListener: handler => removeScreenListener(handler),
  updateChildren,
});

export default connect(method)(ResponsiveContainer);
