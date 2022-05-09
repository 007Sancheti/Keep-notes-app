import {View, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import KeepNotes from './KeepNotesScreen';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../slice/userSlice';

const GoogleSignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.signin);
  console.log({loggedIn});

  const [userInfo, setuserInfo] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '565616440626-712a094uh7ho8pv5u1uouocco7bmhun5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('KeepNotes');
    }
  }, [loggedIn]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => dispatch(userLogin())}
        />
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
