import { takeLatestAsync } from 'saga-toolkit'
import * as actions from '../slice/userSlice'
import {userLogin, signOut} from './userSagas';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    takeLatestAsync(actions.userLogin.type, userLogin),
    takeLatestAsync(actions.signOut.type, signOut)
  ]);
}
