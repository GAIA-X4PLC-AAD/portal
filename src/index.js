import React from 'react';
import {createRoot} from 'react-dom/client';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';

import './i18n';
import App from './App';
import reducers from './reducers';
import AuthContextProvider from "./context/AuthContextProvider";
import {ResourceFilterProvider} from "./context/ResourceFilterContext";

import './index.css';

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

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
        <Provider store={store}>
            <AuthContextProvider>
              <ResourceFilterProvider>
                <App/>
                </ResourceFilterProvider>
            </AuthContextProvider>
        </Provider>
);
