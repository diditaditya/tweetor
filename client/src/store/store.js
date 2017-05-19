import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase";

Vue.use(Vuex);

// const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBMEqZyr5_sE-vig3XwHamRDaslNAc9zmo",
    authDomain: "p2w3d3.firebaseapp.com",
    databaseURL: "https://p2w3d3.firebaseio.com",
    projectId: "p2w3d3",
    storageBucket: "p2w3d3.appspot.com",
    messagingSenderId: "725315320416"
  };

firebase.initializeApp(config);
let flag = firebase.database().ref('tweetor/tweets');


export const store = new Vuex.Store({
  state: {
    firebase: {

    },
    user: {
      username: '',
      id: '',
      avatar: "https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji.jpg",
      tweets: []
    },
    tweets: [],
    sortedTweets: [],
    allTags: {},
    topTags: [],
    shownTweets: []
  },
  getters: {
    user (state) {
      return state.user;
    },
    tweets (state) {
      let sorted = state.tweets.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return sorted;
    },
    tags (state) {
      return state.allTags;
    }
  },
  mutations: {
    addTweet(state, newTweet) {
      state.tweets.unshift(newTweet);
    },
    fillTweets(state, tweets) {
      state.tweets = tweets;
    },
    setUser(state, user) {
      state.user.id = user.id;
      state.user.username = user.username;
      state.user.avatar = user.avatar;
      state.user.tweets = user.tweets;
    },
    removeUser(state) {
      state.user.id = '';
      state.user.username = '';
      state.user.tweets = [];
      state.user.avatar = "https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji.jpg";
    },
    fillTags(state, tags) {
      state.allTags = tags;
    },
    fillShownTweets(state, tweets) {
      state.shownTweets = tweets;
    },
    showUserTweets(state) {
      let userTweets = [];
      state.tweets.map((tweet) => {
        if(tweet.user._id === state.user.id) {
          userTweets.push(tweet);
        }
      });
      state.tweets = userTweets;
    }
  },
  actions: {
    addTweet(context, newTweet) {
      let url = 'http://localhost:3000/tweets/add';
      Vue.axios.post(url, newTweet)
        .then((response) => {
          let tweet = {
            user: context.state.user,
            content: response.data.tweet.content,
            createdAt: response.data.tweet.createdAt,
            tags: response.data.tweet.tags
          }
          context.commit('addTweet', tweet);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTweets(context) {
      let url = 'http://localhost:3000/tweets';
      Vue.axios.get(url)
        .then((response) => {
          context.commit('fillTweets', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTags(context) {
      let url = 'http://localhost:3000/tweets/popularTags';
      Vue.axios.get(url)
        .then((response) => {
          context.commit('fillTags', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterByTag(context, tag) {
      let url = 'http://localhost:3000/tweets/searchTags/' + tag;
      Vue.axios.get(url)
        .then((response) => {
          context.commit('fillTweets', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTweetById(context, id) {
      let url = 'http://localhost:3000/tweet/' + id;
      let self = this;
      Vue.axios.get(url)
        .then((response) => {
          let check = false;
          context.state.tweets.map((tweet) => {
            if(tweet._id === response.data._id) {
              check = true;
            }
          });
          if(check === false) {
            context.commit('addTweet', response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchTags(context, tags) {
      console.log(tags);
      let body = {
        tags: tags
      };
      let url = 'http://localhost:3000/tweets/searchByTags';
      Vue.axios.post(url, {tags: tags})
        .then((response) => {
          console.log(response.data);
          context.commit('fillTweets', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkToken(context, token) {
      let body = {
        token: token
      };
      let url = "http://localhost:3000/users/checkJwt";
      Vue.axios.post(url, body)
        .then((response) => {
          context.commit('setUser', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

flag.on('value', function(tweet) {
  store.dispatch('fetchTweetById', tweet.val().tweetId);
});
