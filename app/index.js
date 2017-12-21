import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createMiddleware } from 'redux-listeners';

import App from './components/App';

import reducers from './reducers';
import registerListeners from './handlers';

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const listenMiddleware = createMiddleware();

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(listenMiddleware)),
);

registerListeners(listenMiddleware);

if (!document.body) {
  throw new Error('There is no document body');
}

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.body);
