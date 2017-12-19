import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore } from 'redux';

import App from './components/App';

const store = createStore(() => {});

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.body);
