import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { githubMatched, githubError, githubScanRepository } from '../../actions/github';

import SVGImage from '../SVGImage';
import Logo from './GitHubLogo.svg';

import './GitHub.scss';
import '../Button.scss';

const exp = new RegExp(/https:\/\/github.com\/([-a-zA-Z0-9@:%_+.~#?&=]*)?\/?([-a-zA-Z0-9@:%_+.~#?&=]*)?\/?/gi);

class GitHub extends Component {
  constructor(props) {
    super(props);

    this.onScanUrl = this.scanUrl.bind(this);
    this.onScanAccount = this.scanAccount.bind(this);
    this.onScanRepository = this.scanRepository.bind(this);
  }

  catchSubmit(e) {
    e.preventDefault();
  }

  scanAccount() {
    const { username } = this.props;
    console.log(username);
  }

  scanRepository() {
    const { username, repository } = this.props;

    this.props.dispatch(githubScanRepository(username, repository));
  }

  scanUrl(e) {
    const url = e.target.value;

    const matchedResults = exp.exec(url);

    if (matchedResults) {
      const [complete, username, repository] = matchedResults;

      this.props.dispatch(githubMatched(username, repository));
      return;
    }

    this.props.dispatch(githubError('Not a valid GitHub url'));
  }

  render({ error, username, repository }) {
    return (
      <form className="GitHub" onSubmit={this.catchSubmit}>
        <div className="GitHub__intro">
          <SVGImage className="GitHub__logo" svg={Logo} />
          <p>Scan your Github account or enter URL to a repository:</p>
        </div>

        <input
          className="GitHub__input"
          type="text"
          placeholder="https://github.com/username/repo"
          onInput={this.onScanUrl}
        />

        {error !== '' && <div className="GitHub__error">{error}</div>}

        {username !== '' && (
          <div className="GitHub__options">
            <button
              className="Button"
              onClick={this.onScanAccount}
            >
              Scan account
            </button>
            {repository !== '' && (
              <button
                className="Button"
                onClick={this.onScanRepository}
              >
                Scan {username}/{repository}
              </button>
            )}
          </div>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { error, username, repository } = state.github;

  return {
    error,
    username,
    repository,
  };
}

export default connect(mapStateToProps)(GitHub);
