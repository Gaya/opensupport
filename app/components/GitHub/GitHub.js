import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { githubMatched, githubError, githubScanRepository } from '../../actions/github';

import SVGImage from '../SVGImage';
import Logo from './GitHubLogo.svg';

import './GitHub.scss';
import '../Button.scss';

class GitHub extends Component {
  constructor(props) {
    super(props);

    this.onScanUrl = this.scanUrl.bind(this);
  }

  catchSubmit(e) {
    e.preventDefault();
  }

  scanUrl(e) {
    const url = e.target.value;
    const exp =
      /https:\/\/github.com\/([-a-zA-Z0-9@:%_+.~#?&=]*)?\/?([-a-zA-Z0-9@:%_+.~#?&=]*)?\/?/gi;

    const matchedResults = exp.exec(url);

    if (matchedResults && matchedResults.length == 3) {
      const [complete, username, repository] = matchedResults;

      this.props.dispatch(githubMatched(username, repository));
      this.props.dispatch(githubScanRepository(username, repository));
      return;
    }

    this.props.dispatch(githubError('Not a valid GitHub repository url'));
  }

  render({ error, loadingMsg }) {
    return (
      <form className="GitHub" onSubmit={this.catchSubmit}>
        <div className="GitHub__intro">
          <SVGImage className="GitHub__logo" svg={Logo} />
          <p>Enter URL to a Github repository:</p>
        </div>

        <input
          className="GitHub__input"
          type="text"
          placeholder="https://github.com/username/repo"
          onInput={this.onScanUrl}
        />

        {error !== '' && <div className="GitHub__error">{error}</div>}

        {loadingMsg !== '' && (
          <div className="GitHub__processing">{loadingMsg}</div>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { error, username, repository, loadingMsg } = state.github;

  return {
    error,
    username,
    repository,
    loadingMsg,
  };
}

export default connect(mapStateToProps)(GitHub);
