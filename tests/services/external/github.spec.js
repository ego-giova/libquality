import axios from 'axios';
import GithubExternalService from '../../../src/services/external/github';
import ExternalAPIError from '../../../src/utils/errors/external-api';

describe('services: github', () => {
  it('getRepositoryById: should be able to throw an error when not found the repository', async () => {
    const response = {
      status: 404,
    };
    const mock = jest.spyOn(axios, 'get');

    // eslint-disable-next-line prefer-promise-reject-errors
    mock.mockReturnValueOnce(Promise.reject({ response }));

    expect.assertions(2);

    try {
      await GithubExternalService.getRepositoryById();
    } catch (err) {
      expect(err.code).toEqual('github_repository_not_found');
      expect(err).toBeInstanceOf(ExternalAPIError);
    }
  });
});
