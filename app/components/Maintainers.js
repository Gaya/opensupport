import { h } from 'preact';
import { connect } from 'preact-redux';

function Maintainer({ name, count }) {
  return (
    <tr>
      <td>{count}</td>
      <td>{name}</td>
      <td>donate</td>
    </tr>
  );
}

function Maintainers({ maintainers }) {
  if (!maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <table>
      <tr>
        <th>
          #
        </th>
        <th>
          Name
        </th>
        <th />
      </tr>
      {maintainers.map(Maintainer)}
    </table>
  );
}

function mapStateToProps({ maintainers }) {
  return { maintainers };
}

export default connect(mapStateToProps)(Maintainers);
