import GithubExternalService from '../../../src/services/external/github';
import LibraryService from '../../../src/services/business/library';

import BusinessError from '../../../src/utils/errors/business';

jest.mock('../../../src/services/external/github');

describe('services: library', () => {
  it('getGithubLibraries: should be able to throw an error when not found libraries', async () => {
    GithubExternalService.searchRepositories = jest.fn(() => ([]));

    expect.assertions(2);

    try {
      await LibraryService.getGithubLibraries();
    } catch (error) {
      expect(error.code).toEqual('libraries_not_found');
      expect(error).toBeInstanceOf(BusinessError);
    }

  });
});
