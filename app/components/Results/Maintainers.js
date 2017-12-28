import { h } from 'preact';
import { connect } from 'preact-redux';

import SVGImage from '../SVGImage';
import Twitter from './TwitterSocialIcon.svg';

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

function Share({ repository, github }) {
  if (!github.username || !github.repository) {
    return null;
  }

  const twitterText = `View top maintainers of "${repository}" on OpenSupport`;
  const url = `https://opensupport.me/github/${github.username}/${github.repository}`;

  return (
    <a
      className="ShareIcon"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`}
    >
      <SVGImage svg={Twitter} />
    </a>
  );
}

function Maintainers({ maintainers, repository, github }) {
  if (!maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <div className="Maintainers">
      <section className="Maintainers__header">
        {repository !== '' && (
          <h2 className="Results__repository">
            Top maintainers {repository !== null && <span>of "{repository}"</span>}
          </h2>
        )}
        <Share repository={repository} github={github} />
      </section>
      <div className="Maintainers__list">
        {maintainers.map(Maintainer)}
      </div>
    </div>
  );
}

function mapStateToProps({ maintainers, repository, github }) {
  return { repository, maintainers, github };
}

export default connect(mapStateToProps)(Maintainers);
