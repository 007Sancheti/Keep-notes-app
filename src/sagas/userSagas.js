import { call, put } from 'redux-saga/effects'
import {
    GoogleSignin,
    statusCodes,
  } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserInfo } from '../slice/userSlice';

export function* userLogin() {
    try {
        yield call(GoogleSignin.hasPlayServices);
        const user = yield call(GoogleSignin.signIn);
        if (user) {
          yield call(AsyncStorage.setItem, 'user', JSON.stringify(user));
          yield put(setUserInfo(user.user))
        }
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          alert('Cancel');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          alert('Signin in progress');
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          alert('PLAY_SERVICES_NOT_AVAILABLE');
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
}

export function* signOut () {
  try {
    yield call(AsyncStorage.clear);
    yield call(GoogleSignin.revokeAccess);
    yield call(GoogleSignin.signOut);
  } catch (error) {
    console.error(error);
  }
};