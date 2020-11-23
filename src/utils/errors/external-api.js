import ExtendableError from './extendable-error';

export default class ExternalAPIError extends ExtendableError {
  constructor(err, code, options) {
    super();
    this.errResponse = err;
    this.code = code;
    this.options = options;
  }
}

export const GithubCodeError = {
  ERROR_SEARCH_REPOSITORIES: 'error_on_github_search_repositories',
  ERROR_GET_REPOSITORY: 'error_on_github_get_repository_by_id',
  ERROR_GET_REPOSITORY_ISSUES: 'error_on_github_get_repository_issues',
  REPOSITORY_NOT_FOUND: 'github_repository_not_found',
  REPOSITORY_OPEN_ISSUES_NOT_FOUND: 'github_repository_open_issues_not_found',
};
