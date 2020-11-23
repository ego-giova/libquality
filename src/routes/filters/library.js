/* eslint-disable import/prefer-default-export */
export function getGithubFilters(req) {
  const searchParameter = {};

  if (req.query.name) {
    searchParameter.name = req.query.name;
  }

  return searchParameter;
}
