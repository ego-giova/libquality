import BusinessError, { LibraryCodeError } from '../../utils/errors/business';
import LibraryQueryMounter from './query-mounter/library';
import GithubExternalService from '../external/github';

export default class LibraryService {
  static async getGithubLibraries(filters) {
    let response = null;
    const query = LibraryQueryMounter.getGithubLibraryQuery(filters);

    response = await GithubExternalService.searchRepositories(query);

    if (!response.items) { throw new BusinessError(LibraryCodeError.LIBRARIES_NOT_FOUND); }

    response = response.items.map((item) => ({ id: item.id, name: item.name, full_name: item.full_name }));

    return response;
  }

  static async getGithubLibraryById(id) {
    let response = null;

    response = await GithubExternalService.getRepositoryById(id);

    // await GithubExternalService.getRepositoryOpenIssues();

    return response;
  }
}
