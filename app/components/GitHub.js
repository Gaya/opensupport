import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './GitHub.scss';

const githubError = error => ({ type: 'GITHUB_ERROR', error });
const githubMatched = (username, repository) => ({ type: 'GITHUB_MATCHED', username, repository });

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

  render() {
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
      </form>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(GitHub);
