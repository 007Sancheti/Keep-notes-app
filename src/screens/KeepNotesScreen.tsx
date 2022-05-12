import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'Newest Notes First', value: 'new'},
  {label: 'Oldest Notes First', value: 'old'},
];

const KeepNotesScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [notes, setNotes] = useState([]);
  const {user} = useSelector(state => state.signin);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (value === 'new') {
      setNotes(
        [...notes].sort((a, b) => {
          let c = new Date(a.date);
          let d = new Date(b.date);
          return d - c;
        }),
      );
    } else if (value === 'old') {
      setNotes(
        [...notes].sort((a, b) => {
          let c = new Date(a.date);
          let d = new Date(b.date);
          return c - d;
        }),
      );
    }
  }, [value]);

  useEffect(() => {
    const onValueChange = database()
      .ref('/users/' + user.id)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        const newNotes = [];
        if (!snapshot.val()) {
          setNotes(newNotes);
          setLoading(false);
          return;
        }
        snapshot.forEach(childSnapshot => {
          newNotes.push({
            ...childSnapshot.val(),
            key: childSnapshot.key,
          });
          setNotes(newNotes);
          setLoading(false);
        });
      });
    return () =>
      database().ref(`/users/${user.id}`).off('value', onValueChange);
  }, [user.id]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          height: '100%',
          padding: 10,
        }}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Sort By' : 'Please Select'}
          onFocus={() => setIsFocus(true)}
          search
          value={value}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <FlatList
          data={notes}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
              }}>
              <View>
                <Text>Title: {item.title}</Text>
                <Text>Content: {item.content}</Text>
                <Text>Date: {item.formattedDate}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="edit"
                  onPress={() => {
                    navigation.navigate('AddEditNoteScreen', {
                      key: item.key,
                      title: item.title,
                      content: item.content,
                    });
                  }}
                  size={20}
                />
                <Icon
                  name="delete"
                  onPress={async () =>
                    await database()
                      .ref(`/users/${user.id}/${item.key}`)
                      .remove()
                  }
                  size={20}
                />
              </View>
            </View>
          )}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="add"
            onPress={() => navigation.navigate('AddEditNoteScreen')}
            size={50}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KeepNotesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
