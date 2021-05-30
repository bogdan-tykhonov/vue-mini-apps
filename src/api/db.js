import firebase from 'firebase/app';

const getUid = () => {
    const user =  firebase.auth().currentUser;
    return  user ? user.uid : null;
  }


const updateDb = async (notes) => {
    await firebase.database().ref(`/users/${getUid()}/todoList`).update({notes: notes});         
};

const loadNotes = async() =>{
    let dbNotes;
    await firebase.database().ref(`/users/${getUid()}/todoList`).once('value', function(snapshot){
        dbNotes = snapshot.val();
    });
    return dbNotes;
};

const makeLogout = async() => {
    await firebase.auth().signOut();
};

const makeLogin = async(email, password) => {
    await  firebase.auth().signInWithEmailAndPassword(email, password);
}

export  {updateDb, loadNotes, makeLogout, makeLogin};