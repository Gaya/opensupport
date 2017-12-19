import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createMiddleware } from 'redux-listeners';

import App from './components/App';

import registerListeners from './handlers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const listenMiddleware = createMiddleware();

const store = createStore(
  () => {},
  composeEnhancers(applyMiddleware(listenMiddleware)),
);

registerListeners(listenMiddleware);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.body);
