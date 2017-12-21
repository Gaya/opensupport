import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { githubMatched, githubError } from './actions';

import './GitHub.scss';

const exp = new RegExp(/https:\/\/github.com\/([-a-zA-Z0-9@:%_+.~#?&=]*)?\/?([-a-zA-Z0-9@:%_+.~#?&=]*)?\/?/gi);

class GitHub extends Component {
  constructor(props) {
    super(props);

    this.onScanUrl = this.scanUrl.bind(this);
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

  render({ error }) {
    return (
      <form className="GitHub">
        <p className="GitHub__intro">
          Scan your Github account or enter URL to a repository:
        </p>

        <input
          className="GitHub__input"
          type="text"
          placeholder="https://github.com/username/repo"
          onChange={this.onScanUrl}
        />

        {error !== '' && <div className="GitHub__error">{error}</div>}
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state.github;

  return {
    error,
  };
}

export default connect(mapStateToProps)(GitHub);
