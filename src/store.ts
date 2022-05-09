import {configureStore} from '@reduxjs/toolkit';
import signinReducer from './slice/userSlice';
import createSagaMiddleware from "redux-saga";
import rootSaga from './sagas/rootSaga';

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
      signin: signinReducer
  },
  middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
