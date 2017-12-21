import { h } from 'preact';
import { connect } from 'preact-redux';

import './Maintainers.scss';

function Lib({ name }) {
  return (
    <a className="Lib" href={`https://npmjs.com/${name}`}>{name}</a>
  );
}

function Maintainer({ name, avatar, count, libs }) {
  return (
    <div className="Maintainer">
      <picture className="Maintainer__avatar">
        <img className="Maintainer__avatar-image" src={avatar} alt={name} />
      </picture>
      <div className="Maintainer__info">
        <div className="Maintainer__name">
          <a href={`https://www.npmjs.com/~${name}`}>{name}</a>
        </div>
        <div className="Maintainer__count">
          Maintains <strong>{count}</strong> of your project's dependencies, including:
        </div>
        <div className="Maintainer__libs">
          {libs.filter((i, index) => index < 5).map(Lib)}
        </div>
      </div>
    </div>
  );
}

function Maintainers({ maintainers }) {
  if (!maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <div className="Maintainers">
      {maintainers.map(Maintainer)}
    </div>
  );
}

function mapStateToProps({ maintainers }) {
  return { maintainers };
}

export default connect(mapStateToProps)(Maintainers);
