import { h } from 'preact';

import Upload from './Upload';
import Maintainers from './Maintainers';

import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>OpenSupport</h1>

      <p>
        Give support back to the open source community by finding out who maintains packages you use
        in your projects.
      </p>

      <Upload />
      <Maintainers />
    </div>
  );
}

export default App;
