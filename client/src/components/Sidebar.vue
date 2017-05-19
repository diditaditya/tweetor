<template lang="html">
  <div class="sidenav">
    <div class="profile">
      <img :src="user.avatar" alt="avatar" class="avatar">
      <div class="username">
        <h3><b>{{ user.username }}</b></h3>
      </div>
    </div>
    <div v-if= "user.username.length > 0" class="navlist">
      <div class="list-group">
        <a v-on:click="backToInitial" href="#" class="list-group-item">Home</a>
        <a v-on:click="showUserTweets" href="#" class="list-group-item">Your Tweets</a>
      </div>
    </div>
    <div v-else class="">
      <h5>Please Sign in</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: [],
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    checkIfLoggedIn() {
      let token = localStorage.getItem('token');
      if(token) {
        this.$store.dispatch('checkToken', token);
      }
    },
    showUserTweets() {
      this.$store.commit('showUserTweets');
    },
    backToInitial() {
      this.$store.dispatch('fetchTweets');
    }
  },
  created: function() {
    this.checkIfLoggedIn();
  },
  mounted: function() {
    this.checkIfLoggedIn();
  }
}
</script>

<style lang="css">

.sidenav {
    /*border: 1px solid grey;*/
    max-width: 500px;
    margin-bottom: -5000px;
    padding-bottom: 5000px;
}

.profile {
  /*border-bottom: 1px solid grey;*/
}

.avatar {
  padding: 25px;
  /*border: 1px solid grey;*/
  border-radius: 50%;
  max-width: 100%;
}

.username {
  margin: -25px 5px 5px 5px;
  font-family: 'Lato', sans-serif;
  color: white;
  background-color: #222222;
  border-radius: 10px;
}

</style>
