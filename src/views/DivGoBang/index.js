import React from 'react';
import DivChessBoard from '../../views/DivChessBoard';
import DivPieces from '../../router/DivPieces';
import geocoding from '../../router/geocoding';
import './style.less';

export const DivGoBang = props => (
  <div className="div-gobang-style">
    <DivChessBoard {...props} />
    <DivPieces {...props} />
  </div>
);

export default geocoding(DivGoBang);
