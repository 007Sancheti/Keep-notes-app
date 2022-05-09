import firestore from '@react-native-firebase/firestore';

export function addNote(note) {
    const usersCollection = firestore().collection('Notes').doc('v5g10K4vS6oHDk3mmrHw');
    console.log({usersCollection});
}