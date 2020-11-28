import moment from 'moment';
import BusinessError from '../../../src/utils/errors/business';
import MetricsService from '../../../src/services/business/metrics';
import GithubExternalService from '../../../src/services/external/github';
import LibraryTrackRepository from '../../../src/db/repositories/library-track';

jest.mock('../../../src/services/external/github');
jest.mock('../../../src/db/repositories/library-track');

describe('services: metrics', () => {
  it('getOpenIssuesMetrics: should be able to return empty when doesnt exist data', async () => {
    const owner = 'facebook';
    const repository = 'react';
    const mockGetAllRepositoryOpenIssues = jest.fn(() => ([]));

    GithubExternalService.getAllRepositoryOpenIssues = mockGetAllRepositoryOpenIssues;

    const result = await MetricsService.getOpenIssuesMetrics(owner, repository);

    expect(result).toStrictEqual({
      averageTimeInDays: 0,
      standardDeviationTimeInDays: 0,
    });
  });

  it('getOpenIssuesMetrics: should be able to get open issues metrics', async () => {
    const owner = 'facebook';
    const repository = 'react';
    const mockGetAllRepositoryOpenIssues = jest.fn(() => ([
      { created_at: moment().subtract(32, 'days') },
      { created_at: moment().subtract(36, 'days') },
    ]));

    GithubExternalService.getAllRepositoryOpenIssues = mockGetAllRepositoryOpenIssues;

    const result = await MetricsService.getOpenIssuesMetrics(owner, repository);

    expect(result).toStrictEqual({
      averageTimeInDays: 34,
      standardDeviationTimeInDays: 2,
    });
  });

  it('getLineChartStatistics: should be able to throw an error when not found', async () => {
    LibraryTrackRepository.findLibrariesGroupedByDate = jest.fn(() => ([]));

    expect.assertions(2);

    try {
      await MetricsService.getLineChartStatistics();
    } catch (error) {
      expect(error.code).toEqual('not_found_statistics_for_requested_libraries');
      expect(error).toBeInstanceOf(BusinessError);
    }
  });
});
