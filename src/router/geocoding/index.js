import { setCoordinate, detectWidthChanged } from '../../controllers/geocoding';
import { connect } from '../../hocs/connect';
import geocoding from '../../hocs/geocoding';

export const method = () => ({
  setCoordinate,
  detectWidthChanged,
});

export default WrapperedComponent => connect(method)(geocoding(WrapperedComponent));
