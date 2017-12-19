import { h } from 'preact';
import { connect } from 'preact-redux';

function Maintainer({ name, avatar, count }) {
  return (
    <div>
      <picture>
        <img src={avatar} alt={name} />
      </picture>
      <div>Found in {count} dependencies</div>
      <div>{name}</div>
    </div>
  );
}

function Maintainers({ maintainers }) {
  if (!maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <div>
      {maintainers.map(Maintainer)}
    </div>
  );
}

function mapStateToProps({ maintainers }) {
  return { maintainers };
}

export default connect(mapStateToProps)(Maintainers);
