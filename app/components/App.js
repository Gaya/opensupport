import { h } from 'preact';

import Upload from './Upload';
import Maintainers from './Maintainers';

function App() {
  return (
    <div>
      <h1>OpenSupport</h1>
      <Upload />
      <Maintainers />
    </div>
  );
}

export default App;
