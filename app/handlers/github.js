import { receiveResults } from '../actions/receiving';
import {
  githubSendJson,
  githubError,
  githubScanRepository,
  githubMatched,
} from '../actions/github';

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
    .then(result => dispatch(receiveResults(result)))
    .catch(e => dispatch(githubError(e.message)));
};

const onGitHubMatched = (dispatch, { username, repository }) => {
  if (!repository) {
    return;
  }

  dispatch(githubScanRepository(username, repository));

  if (window.history) {
    const title = `Top maintainers of ${username}/${repository} | OpenSupport`;

    document.title = title;

    history.pushState({ username, repository }, title, `/github/${username}/${repository}`);
  }
};

const readUrl = (dispatch) => {
  if (!window.location) {
    return;
  }

  const exp = /^\/github\/([-a-zA-Z0-9@:%_+.~#?&=]+)\/([-a-zA-Z0-9@:%_+.~#?&=]*)\/?/gi;

  const [complete, username, repository] = exp.exec(window.location.pathname);

  if (username && repository) {
    dispatch(githubMatched(username, repository));
  }
}

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('GITHUB_SCAN_REPOSITORY', onScanRepository);
  listenMiddleware.addListener('GITHUB_SEND_JSON', onSendJson);
  listenMiddleware.addListener('GITHUB_MATCHED', onGitHubMatched);
  listenMiddleware.addListener('INITIALIZE', readUrl);
}
