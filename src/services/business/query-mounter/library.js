export default class LibraryQueryMounter {
  static getGithubLibraryQuery(filters = {}) {
    let query = '';

    if (filters.name) {
      query += `q=${filters.name}&sort=create&order=desc`;
    }

    return query;
  }
}
