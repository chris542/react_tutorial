import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDMS6uHyi3oUbHAYng7yRJOjALoWzDsJag",
    authDomain: "form-test-c3be7.firebaseapp.com",
    databaseURL: "https://form-test-c3be7.firebaseio.com",
    projectId: "form-test-c3be7",
    storageBucket: "form-test-c3be7.appspot.com",
    messagingSenderId: "1062810265898"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    })
    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper,
}
