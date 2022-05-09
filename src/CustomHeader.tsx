import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import React from 'react';

import {logOut} from './services/AuthService';
import { signOut } from './slice/userSlice';
import { useDispatch } from 'react-redux';

const CustomHeader = ({profile, logout = true}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {profile && <Avatar size={32} rounded source={{uri: profile.photo}} />}
      <Text>Keep Notes</Text>
      {logout && (
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;
