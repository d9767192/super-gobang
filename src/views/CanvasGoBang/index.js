import React from 'react';
import CanvasChessBoard from '../CanvasChessBoard';
import CanvasPieces from '../CanvasPieces';
import geocoding from '../../hocs/geocoding';
import './style.less';

const CanvasGoBang = props => (
  <div className="canvas-gobang-style">
    <CanvasChessBoard {...props} />
    <CanvasPieces {...props} />
  </div>
);

export default geocoding(CanvasGoBang);
