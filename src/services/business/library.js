import BusinessError, { LibraryCodeError } from '../../utils/errors/business';
import LibraryQueryMounter from './query-mounter/library';

import LibraryTrackRepository from '../../db/repositories/library-track';
import GithubExternalService from '../external/github';
import MetricsService from './metrics';

export default class LibraryService {
  static async getGithubLibraries(filters) {
    let response = null;
    const query = LibraryQueryMounter.getGithubLibraryQuery(filters);

    response = await GithubExternalService.searchRepositories(query);

    if (!response.items || !response.items.length) { throw new BusinessError(LibraryCodeError.LIBRARIES_NOT_FOUND); }

    response = response.items.map((item) => ({ id: item.id, name: item.name, full_name: item.full_name }));

    return response;
  }

  static async getGithubLibraryById(id) {
    let response = null;

    // Read of the mongo when the lib already searched on day.
    response = await LibraryTrackRepository.findLibrarySearchedTodayById(id);

    if (response) {
      return {
        id: response.libraryId,
        full_name: response.libraryName,
        openIssuesCount: response.metrics.open_issues.count,
        averageTimeInDays: response.metrics.open_issues.averageTimeInDays,
        standardDeviationTimeInDays: response.metrics.open_issues.standardDeviationTimeInDays,
      };
    }

    response = await MetricsService.collectOpenIssuesMetricsById(id);

    return response;
  }
}
