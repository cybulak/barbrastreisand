import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from '../Reducer';
import sagas from '../Sagas/index';
import history from './history';

const middleware = [];
const enhancers = [];

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);
middleware.push(routerMiddleware(history));

// TODO: env
// if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
middleware.push(loggerMiddleware);
// }

enhancers.push(applyMiddleware(...middleware));

const store = createStore(createRootReducer(history), compose(...enhancers));

sagaMiddleware.run(sagas);

export { store };
