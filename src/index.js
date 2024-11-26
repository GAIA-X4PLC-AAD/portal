/* test coverage not required */
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './i18n';
import ErrorBoundary from './common/./errorHandling/ErrorBoundary';
import { ErrorProvider } from './common/./errorHandling/ErrorContext';
import AuthContextProvider from './components/context/AuthContextProvider';
import { ResourceContextProvider } from './components/context/ResourceContext';
import App from './components/main/App';
import reducers from './reducers';

import 'react-toastify/dist/ReactToastify.css';
import './common/components/notification/Notification.css'

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

// TODO: May be not the entire store should be saved into cookies. It has to be refactored.
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <ResourceContextProvider>
        <ErrorProvider>
          <ErrorBoundary>
            <App/>
          </ErrorBoundary>
        </ErrorProvider>
        <ToastContainer/>
      </ResourceContextProvider>
    </AuthContextProvider>
  </Provider>
);
