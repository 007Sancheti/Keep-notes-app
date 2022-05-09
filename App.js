/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <AuthLoadingScreen />
    </Provider>
  );
};

export default App;
