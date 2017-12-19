import { h, Component } from 'preact';
import { connect } from 'preact-redux';

const uploadFile = file => ({ type: 'UPLOAD_FILE', file });

import './Upload.scss';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.fileChange.bind(this);
  }

  fileChange(e) {
    if (!e.target || !e.target.files || e.target.files.length !== 1) {
      throw new Error('Invalid event');
    }

    try {
      const file = this.validFile(e.target.files[0]);
      this.props.dispatch(uploadFile(file));
    } catch (e) {
      console.error(e);
    }
  }

  validFile(file) {
    if (file.type !== 'application/json') {
      throw new Error('Invalid file');
    }

    if (file.name !== 'package.json') {
      throw new Error('Not a package.json file');
    }

    return file;
  }

  render({ processing }) {
    return (
      <form className="Upload" method="POST">
        <p className="Upload__intro">
          Upload a package.json file to scan for top maintainers
        </p>

        <label className="Upload__label" htmlFor="upload">Browse</label>
        <input
          className="Upload__input"
          id="upload"
          disabled={processing}
          type="file"
          onChange={this.onFileChange}
        />

        {processing && <div className="Upload__processing">Processing package.json file</div>}
      </form>
    );
  }
}

function mapStateToProps({ processing }) {
  return {
    processing,
  };
}

export default connect(mapStateToProps)(Upload);
