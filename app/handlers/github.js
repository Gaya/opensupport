import { receiveMaintainers } from '../actions/receiving';
import { githubSendJson, githubError } from '../actions/github';

const api = 'https://api.github.com';
const raw = 'https://raw.githubusercontent.com';

function getPackageJson(username, repository, branch) {
  const url = `${raw}/${username}/${repository}/${branch}/package.json`;

  return fetch(url).then(response => response.json());
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
    .then(maintainers => dispatch(receiveMaintainers(maintainers)));
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('GITHUB_SCAN_REPOSITORY', onScanRepository);
  listenMiddleware.addListener('GITHUB_SEND_JSON', onSendJson);
}
