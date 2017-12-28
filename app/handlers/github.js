import { receiveMaintainers } from '../actions/receiving';
import { githubSendJson, githubError, githubScanRepository } from '../actions/github';

const api = 'https://api.github.com';
const raw = 'https://raw.githubusercontent.com';

function getPackageJson(username, repository, branch) {
  const url = `${raw}/${username}/${repository}/${branch}/package.json`;

  return fetch(url)
    .then(response => response.json())
    .catch(() => { throw new Error('Could not find package.json file'); });
}

const onScanRepository = (dispatch, action) => {
  const { username, repository } = action;

  fetch(`${api}/repos/${username}/${repository}`)
    .then(response => response.json())
    .then(repo => getPackageJson(username, repository, repo.default_branch))
    .then(packageJson => dispatch(githubSendJson(packageJson)))
    .catch(e => dispatch(githubError(e.message)));
};

const onSendJson = (dispatch, action) => {
  fetch(
    `${API_URL}/scan/json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(action.packageJson),
    })
    .then(response => response.json())
    .then(maintainers => dispatch(receiveMaintainers(maintainers)))
    .catch(e => dispatch(githubError(e.message)));
};

const onGitHubMatched = (dispatch, { username, repository }) => {
  if (!repository) {
    return;
  }

  dispatch(githubScanRepository(username, repository));

  if (window.history) {
    history.pushState(
      { username, repository },
      `Top maintainers of ${username}/${repository} | OpenSupport`,
      `/github/${username}/${repository}`,
    );
  }
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('GITHUB_SCAN_REPOSITORY', onScanRepository);
  listenMiddleware.addListener('GITHUB_SEND_JSON', onSendJson);
  listenMiddleware.addListener('GITHUB_MATCHED', onGitHubMatched);
}
