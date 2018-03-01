import React from 'react';
import CanvasChessBoard from '../../router/CanvasChessBoard';
import CanvasPieces from '../../router/CanvasPieces';
import geocoding from '../../router/geocoding';
import './style.less';

export const CanvasGoBang = props => (
  <div className="canvas-gobang-style">
    <CanvasChessBoard {...props} />
    <CanvasPieces {...props} />
  </div>
);

export default geocoding(CanvasGoBang);
