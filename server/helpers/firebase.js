const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBMEqZyr5_sE-vig3XwHamRDaslNAc9zmo",
    authDomain: "p2w3d3.firebaseapp.com",
    databaseURL: "https://p2w3d3.firebaseio.com",
    projectId: "p2w3d3",
    storageBucket: "p2w3d3.appspot.com",
    messagingSenderId: "725315320416"
  };

firebase.initializeApp(config);

let database = firebase.database();

let fire = {
  writeTweetData: function(flag) {
    console.log('--------------in the writeTweetData');
    firebase.database().ref('tweetor/tweets').set({
      action: flag.action,
      tweetId: flag.tweetId
    });
  }
}

module.exports = fire;
