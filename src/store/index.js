import { createStore } from 'redux';
import rootReducer from '../slices/index.js';

export function configureStore(preloadedState = {}) {
    const store = createStore(rootReducer, preloadedState);
    return store;
}