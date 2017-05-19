<template lang="html">
  <div style="margin: 0% 25% 0% 25%">
    <form v-on:submit.prevent="signin" class="form-group" action="index.html" method="post">
      <input v-model="username" type="text" placeholder="Username" class="form-control" style="margin-bottom: 5px">
      <input v-model="password" type="password" placeholder="Password" class="form-control" style="margin-bottom: 5px">
      <input type="submit" value="Log In" class="btn btn-danger">
    </form>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data: function() {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    signin() {
      if(this.username.length > 0 && this.password.length > 0) {
        let data = {
          username: this.username,
          password: this.password
        };
        let self = this;
        let url = 'http://localhost:3000/signin';
        this.axios.post(url, data)
          .then((response) => {
            self.$store.commit('setUser', response.data.user);
            localStorage.setItem('token', response.data.token);
            self.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.message = 'username and password are required';
      }
    }
  }
}
</script>

<style lang="css">

</style>
