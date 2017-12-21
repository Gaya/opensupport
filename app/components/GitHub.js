import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './GitHub.scss';

class GitHub extends Component {
  constructor(props) {
    super(props);
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
        />
      </form>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(GitHub);
