import { configureStore as configure_store } from '@reduxjs/toolkit';
import { Store } from 'redux';

import reducers, { AppState } from './reducers';

export const configureStore = (persistedStore: any): Store<AppState> =>
  configure_store({
    reducer: reducers,
    preloadedState: persistedStore,
  })

