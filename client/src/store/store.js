import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import saga from 'redux-saga';
import rootSaga from '../saga/index';

const sagaMiddleware = saga();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
