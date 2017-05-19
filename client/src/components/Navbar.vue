<template lang="html">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div v-on:click="goHome" class="navbar-header">
        <a class="navbar-brand" href="#"><span class="glyphicon glyphicon-home"></span> tweetor</a>
      </div>
      <div class="button-container">
        <router-link v-if="user.username.length <= 0" to="/signin">
          <button type="button" class="btn btn-default">Log In</button>
        </router-link>
        <router-link v-if="user.username.length <= 0" to="/signup">
          <button type="button" class="btn btn-default">Sign Up</button>
        </router-link>
        <button v-else v-on:click="logout" type="button" class="btn btn-default">Log Out</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem('token');
      this.$store.commit('removeUser');
      this.$router.push('/');
    },
    goHome: function() {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="css">

.navbar {
  top: 0;
  margin-top: -60px;
}

.button-container {
  float: right;
  margin-top: 7px;
}

</style>
