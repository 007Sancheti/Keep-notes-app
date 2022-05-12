import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {navigationRef} from '../utils/RootNavigation';
import GoogleSignInScreen from './GoogleSignInScreen';
import KeepNotesScreen from './KeepNotesScreen';
import CustomHeader from '../CustomHeader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../services/AuthService';
import {restoreUserInfo} from '../slice/userSlice';
import {Dimensions} from 'react-native';
import AddEditNotesScreen from './AddEditNoteScreen';

const Stack = createNativeStackNavigator();

const AuthLoadingScreen = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const {user, loggedIn} = useSelector(state => state.signin);

  const isLoggedInAsync = async () => {
    const {user} = await getUser();
    setProfile(user);
    if (user) {
      dispatch(restoreUserInfo(user));
    }
  };

  useEffect(() => {
    isLoggedInAsync();
  }, [user.id]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!loggedIn ? (
          <Stack.Screen
            name="SignIn"
            component={GoogleSignInScreen}
            options={{title: 'User Login'}}
          />
        ) : (
          <>
            <Stack.Screen
              name="KeepNotes"
              component={KeepNotesScreen}
              options={{
                headerTitle: props => (
                  <CustomHeader profile={profile} {...props} />
                ),
              }}
            />
            <Stack.Screen
              name="AddEditNoteScreen"
              component={AddEditNotesScreen}
              options={{
                title: 'Add / Edit',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthLoadingScreen;
