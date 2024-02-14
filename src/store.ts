import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { allSagas } from './sagas';
import { userSliceReducer } from './reducer';
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer: {
        user: userSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
  });

sagaMiddleware.run(allSagas);


