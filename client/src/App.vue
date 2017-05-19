<template>
  <div id="app">
    <navbar></navbar>
    <div class="container" id="main">
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-3 leftcol">
          <sidebar :user="user"></sidebar>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6 river">
          <div class="newTweetForm">
            <form v-if="user.username.length > 0" v-on:submit.prevent="postNewTweet" class="form-group" action="index.html" style="border: 1px solid grey; border-radius: 10px; padding: 5px">
                <input v-model="newTweet" type="text" class="form-control" placeholder="what's happening?" style="border-radius: 5px; margin-bottom: 5px">
                <input type="submit" name="submit" value="Tweet!" class="btn btn-danger">
            </form>
          </div>
          <router-view :tweets="tweets"></router-view>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-3 rightcol">
          <rightbar></rightbar>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Rightbar from './components/Rightbar'

export default {
  name: 'app',
  components: {
    Navbar, Sidebar, Rightbar
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    tweets() {
      return this.$store.getters.tweets;
    }
  },
  data: function() {
    return {
      sortedTweets: [],
      newTweet: '',
      newTweetTags: []
    }
  },
  methods: {
    sortTweets() {
      let sorted = this.tweets.sort((a, b) => {
        return a.createdAt < b.createdAt;
      });
      this.sortedTweets = sorted;
    },
    postNewTweet() {
      if(this.newTweet !== null && this.newTweet.length > 0) {
        this.findTags();
        let tweet = {
          user: this.user.id,
          content: this.newTweet,
          createdAt: new Date(),
          tags: this.newTweetTags
        };
        this.$store.dispatch('addTweet', tweet);
      }
    },
    findTags() {
      let parsed = this.newTweet.match(/#\w+/ig);
      let self = this;
      if(parsed) {
        parsed.map((tag) => {
          let correctedTag = tag.replace('#','');
          self.newTweetTags.push(correctedTag);
        });
      }
    },
    checkIfLoggedIn() {
      let token = localStorage.getItem('token');
      if(token) {
        this.$store.dispatch('checkToken', token);
      }
    }
  },
  created: function() {
    this.$store.dispatch('fetchTweets');
    this.$store.dispatch('fetchTags');
    this.checkIfLoggedIn();
  },
  mounted: function() {
    this.sortTweets();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#main {
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 10px;
}

.container {
  overflow: hidden;
}

.leftcol {
  margin-left: -15px;
}

.rightcol {
  float: right;
}

.river {
  margin: 5px;
  max-width: 80%;
}

* {
}

</style>
