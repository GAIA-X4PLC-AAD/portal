import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import './i18n';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxThunk)
  ));


ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback="..... is loading" >
        <App />
      </Suspense>
      
    </Provider>,
  document.getElementById('root')
);
