import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../utils/RootNavigation';

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : undefined;
};
