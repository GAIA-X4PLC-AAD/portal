import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n';
import App from './App';
import { configureStore } from './configureStore';
import AuthContextProvider from './context/AuthContextProvider';
import { SchemasContextProvider } from './context/SchemasContext';

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
const store = configureStore(persistedStore);

// TODO: May be not the entire store should be saved into cookies. It has to be refactored.
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <SchemasContextProvider>
        <App/>
      </SchemasContextProvider>
    </AuthContextProvider>
  </Provider>
);
