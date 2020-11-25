import moment from 'moment';
import MathUtils from '../../utils/math';
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
}
