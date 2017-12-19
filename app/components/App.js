import { h } from 'preact';

import Upload from './Upload';
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
        OpenSupport is an idea by <a href="https://twitter.com/GayaKessler">Gaya Kessler</a>,
        and is <a href="https://github.com/Gaya/opensupport">open source</a>.
      </p>

      <Upload />
      <Maintainers />
    </div>
  );
}

export default App;
