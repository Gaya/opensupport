import { h } from 'preact';

import Upload from './Upload';
import GitHub from './GitHub';
import Maintainers from './Maintainers';

import './App.scss';

function App() {
  return (
    <div className="App">
      <h1 className="App__title">OpenSupport</h1>

      <p>
        Give support back to the open source community by finding out who maintains packages you use
        in your projects.
      </p>

      <p>
        OpenSupport scans your project's package.json for dependencies (and their dependencies) to
        find out with maintainers' packages are used the most.
      </p>

      <section className="App__options">
        <GitHub />
        <Upload />
      </section>

      <section className="App__results">
        <Maintainers />
      </section>

      <p>
        OpenSupport is an idea by <a href="https://twitter.com/GayaKessler">Gaya Kessler</a>,
        and is <a href="https://github.com/Gaya/opensupport">open source</a>.
      </p>

      <p>
        Planned features: composer.json support, scan GitHub repository, scan GitHub account,
        show most packages used as result, donate links for mainters, donate links for packages.
      </p>
    </div>
  );
}

export default App;
