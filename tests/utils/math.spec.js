import MathUtils from '../../src/utils/math';

describe('utils: math', () => {
  it('calculateAverage: should be able to return average of a dataset', () => {
    const dataset = [10, 8, 6, 6];
    const result = MathUtils.calculateAverage(dataset);

    expect(result).toBe(7.5);
  });

  it('calculateStandardDeviation: should be able to return standard deviation of a dataset', () => {
    const dataset = [10000, 30000, 90000, 30000];
    const average = MathUtils.calculateAverage(dataset);
    const result = MathUtils.calculateStandardDeviation(dataset, average);

    expect(result).toBe(30000);
  });
});
