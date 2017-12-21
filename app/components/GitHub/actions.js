export const githubError =
    error => ({ type: 'GITHUB_ERROR', error });
export const githubMatched =
  (username, repository = '') => ({ type: 'GITHUB_MATCHED', username, repository });
export const githubScanRepository =
  (username, repository) => ({ type: 'GITHUB_SCAN_REPOSITORY', username, repository });
