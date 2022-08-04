import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import './i18n';
import reducers from './reducers';
import axios from "axios"
import { retrieveToken } from "./common/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import history from "./common/history"


axios.interceptors.request.use(function (config) {
  const token = retrieveToken();

  if (token) {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${token}`,
    };
  }
  return config;
}, function (error) {
  console.log("in axios interceptors request error")
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    history.push("/signin")

    return Promise.resolve();
  }
  return Promise.reject(error);
});

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

const store = configureStore({
  reducer: reducers,
  preloadedState: persistedStore,
});

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
