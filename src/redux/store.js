import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const saggaMiddleware = createSagaMiddleware();
const middlewares = [saggaMiddleware];

if (process.env.NODE_ENV==='development') {
    middlewares.push(logger);
} 
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
saggaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default { store, persistor };
