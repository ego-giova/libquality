export default class MathUtils {
  static calculateAverage(dataset) {
    const sumDataset = dataset.reduce((total, data) => (total + Number(data)), 0);
    const average = sumDataset / dataset.length;

    return Number(average.toFixed(2));
  }

  static calculateStandardDeviation(dataset, average) {
    let variance = dataset.reduce((total, data) => (total + ((data - average) ** 2)), 0);

    variance /= dataset.length;
    const standardDeviation = Math.sqrt(variance);

    return Number(standardDeviation.toFixed(2));
  }
}
