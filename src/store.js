import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';

// const URL = process.env.PUBLIC_URL || '/';
const BaseName =
  document.location.pathname.split('index.html')[0] + 'index.html';
export const history = createHistory({ basename: BaseName });

// const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const loadState = () => {
  try {
    const serialiazedState = localStorage.getItem('state');
    if (serialiazedState === null) {
      return undefined;
    }
    return JSON.parse(serialiazedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialiazedState = JSON.stringify(state);
    localStorage.setItem('state', serialiazedState);
  } catch (e) {
    console.log(e);
  }
};

// Persist Store (Load)
const persistedState = loadState();

const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composedEnhancers
);

// Persist Store (Save)
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
