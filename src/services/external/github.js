import axios from 'axios';
import httpStatus from 'http-status';
import { handleAxiosError } from '../../utils/utils';
import Constants from '../../utils/constants';
import ExternalAPIError, { GithubCodeError } from '../../utils/errors/external-api';

export default class GithubExternalService {
  static async searchRepositories(query) {
    let response = null;

    try {
      response = await axios.get(`${Constants.github.host}/search/repositories?${query}`);

      if (response && response.data) {
        response = response.data;
      }
    } catch (err) {
      throw new ExternalAPIError(handleAxiosError(err), GithubCodeError.ERROR_SEARCH_REPOSITORIES);
    }

    return response;
  }

  static async getRepositoryById(id) {
    let response = null;

    try {
      response = await axios.get(`${Constants.github.host}/repositories/${id}`);

      if (response && response.data) {
        response = response.data;
      }
    } catch (err) {
      if (err.response && err.response.status && err.response.status === httpStatus.NOT_FOUND) {
        throw new ExternalAPIError(handleAxiosError(err), GithubCodeError.REPOSITORY_NOT_FOUND);
      }

      throw new ExternalAPIError(handleAxiosError(err), GithubCodeError.ERROR_GET_REPOSITORY);
    }

    return response;
  }

  static async getRepositoryOpenIssues(owner, repository, page) {
    let response = null;

    try {
      response = await axios.get(`${Constants.github.host}/repos/${owner}/${repository}/issues`
        + `?state=open&sort=created&page=${page}&per_page=100`);

      if (response && response.data) {
        response = response.data;
      }
    } catch (err) {
      if (err.response && err.response.status && err.response.status === httpStatus.NOT_FOUND) {
        throw new ExternalAPIError(handleAxiosError(err), GithubCodeError.REPOSITORY_OPEN_ISSUES_NOT_FOUND);
      }

      throw new ExternalAPIError(handleAxiosError(err), GithubCodeError.ERROR_GET_REPOSITORY_ISSUES);
    }

    return response;
  }
}
