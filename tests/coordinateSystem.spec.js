import { getCoordinate } from '../src/controllers/coordinateSystem';

describe('coordinateSystem', () => {
  describe('getCoordinate', () => {
    it('should return grid system', () => {
      const props = {
        width: 400,
        ratio: 1,
        grid: 15,
      };
      const result = getCoordinate(props);
      expect(Array.isArray(result) && result.length === (props.grid + 2)).toBeTruthy();
    });
  });
});
