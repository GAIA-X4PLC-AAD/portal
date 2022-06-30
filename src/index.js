import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import './i18n';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();


const store = createStore(reducers, persistedStore, composeEnhancers(
  applyMiddleware(reduxThunk)
));

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="..... is loading" >
      <App />
    </Suspense>

  </Provider>,
  document.getElementById('root')
);
