/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import httpStatus from 'http-status';
import MathUtils from '../../utils/math';
import BusinessError, { MetricsCodeError } from '../../utils/errors/business';
import LibraryTrackRepository from '../../db/repositories/library-track';
import GithubExternalService from '../external/github';

export default class MetricsService {
  static async getOpenIssuesMetrics(owner, repositoryName) {
    const issues = await GithubExternalService.getAllRepositoryOpenIssues(owner, repositoryName);

    if (!issues.length) {
      return {
        averageTimeInDays: 0,
        standardDeviationTimeInDays: 0,
      };
    }

    const issuesDays = issues.map((issue) => (moment().diff(issue.created_at, 'days')));
    const averageTimeInDays = MathUtils.calculateAverage(issuesDays);
    const standardDeviationTimeInDays = MathUtils.calculateStandardDeviation(issuesDays, averageTimeInDays);

    return {
      averageTimeInDays,
      standardDeviationTimeInDays,
    };
  }

  static async collectOpenIssuesMetricsById(libraryId) {
    const response = await GithubExternalService.getRepositoryById(libraryId);
    const openIssuesMetrics = await MetricsService
      .getOpenIssuesMetrics(response.owner.login, response.name);
    const libraryTrackPayload = {
      libraryId: response.id,
      libraryName: response.full_name,
      metrics: {
        open_issues: {
          count: response.open_issues_count,
          ...openIssuesMetrics,
        },
      },
    };

    await LibraryTrackRepository.create(libraryTrackPayload);

    return {
      id: response.id,
      full_name: response.full_name,
      openIssuesCount: response.open_issues_count,
      ...openIssuesMetrics,
    };
  }

  static async getLineChartStatistics(librariesId) {
    let response = {};
    const rawResponse = await LibraryTrackRepository.findLibrariesGroupedByDate(librariesId);

    if (!rawResponse || !rawResponse.length) {
      throw new BusinessError(MetricsCodeError.LIBRARIES_STATISTICS_NOT_FOUND, { status: httpStatus.NOT_FOUND });
    }

    response = {
      dates: rawResponse.map((item) => item._id),
      series: [],
    };

    rawResponse.forEach((item) => {
      item.libraries.forEach((library) => {
        let alreadyExist = response.series.find((libSeries) => libSeries.libraryId === library.libraryId);

        if (!alreadyExist) {
          response.series.push({
            libraryId: library.libraryId,
            libraryName: library.libraryName,
            openIssuesCountData: [],
            averageTimeInDaysData: [],
            standardDeviationTimeInDaysData: [],
          });
          alreadyExist = response.series[response.series.length - 1];
        }

        alreadyExist.openIssuesCountData.push(library.openIssuesCount);
        alreadyExist.averageTimeInDaysData.push(library.averageTimeInDays);
        alreadyExist.standardDeviationTimeInDaysData.push(library.standardDeviationTimeInDays);
      });
    });

    return response;
  }
}
