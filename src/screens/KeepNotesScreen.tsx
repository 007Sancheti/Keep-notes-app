import {ActivityIndicator, View, Text, FlatList, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const KeepNotesScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [notes, setNotes] = useState([]);
  console.log({notes});

  useEffect(() => {
    const subscriber = firestore()
      .collection('Notes')
      .onSnapshot(querySnapshot => {
        const notes = [];
        querySnapshot.forEach(documentSnapshot => {
          notes.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setNotes(notes);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={{
      flex: 1,
      height: '100%',
      padding: 10,
    }}>
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
              <Text>Date: {item.date}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="edit" onPress={() => {
                navigation.navigate('AddEditNoteScreen', {
                  key: item.key,
                  title: item.title,
                  content: item.content
                })
              }} size={20} />
              <Icon
                name="delete"
                onPress={() =>
                  firestore()
                    .collection('Notes')
                    .doc(item.key)
                    .delete()
                    .then(() => {
                      console.log('User deleted!');
                    })
                }
                size={20}
              />
            </View>
          </View>
          
        )}
      />
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon
          name="add"
          onPress={() => navigation.navigate('AddEditNoteScreen')
          }
          size={50}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default KeepNotesScreen;
