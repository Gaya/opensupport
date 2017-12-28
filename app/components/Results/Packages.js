import { h } from 'preact';
import { connect } from 'preact-redux';

import SVGImage from '../SVGImage';
import Twitter from './TwitterSocialIcon.svg';

import './Maintainers.scss';

function Maintainer(name) {
  return (
    <a className="Lib" href={`https://npmjs.com/~${name}`}>{name}</a>
  );
}

function Package({ name, count, maintainers }) {
  return (
    <div className="Maintainer">
      <div className="Maintainer__info">
        <div className="Maintainer__name">
          <a href={`https://www.npmjs.com/package/${name}`}>{name}</a>
        </div>
        <div className="Maintainer__count">
          Used <strong>{count}</strong> times in your repository, maintained by:
        </div>
        <div className="Maintainer__libs">
          {maintainers.map(Maintainer)}
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

function Packages({ packages, repository, github }) {
  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <div className="Maintainers">
      <section className="Maintainers__header">
        {repository !== '' && (
          <h2 className="Results__repository">
            Top packages {repository !== null && <span>of "{repository}"</span>}
          </h2>
        )}
        <Share repository={repository} github={github} />
      </section>
      <div className="Maintainers__list">
        {packages.map(Package)}
      </div>
    </div>
  );
}

function mapStateToProps({ packages, repository, github }) {
  return { repository, packages, github };
}

export default connect(mapStateToProps)(Packages);
