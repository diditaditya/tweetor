<template lang="html">
  <div style="margin: 0% 25% 0% 25%">
    <form v-on:submit.prevent="signup" class="form-group" action="index.html" method="post">
      <input v-model="username" type="text" placeholder="Username" class="form-control" style="margin-bottom: 5px">
      <input v-model="password" type="password" placeholder="Password" class="form-control" style="margin-bottom: 5px">
      <input v-model="avatar" type="text" placeholder="Avatar URL" class="form-control" style="margin-bottom: 5px">
      <input type="submit" value="Sign Up" class="btn btn-danger">
    </form>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data: function() {
    return {
      username: '',
      password: '',
      avatar: '',
      message: ''
    }
  },
  methods: {
    signup() {
      if(this.username.length > 0 && this.password.length > 0) {
        let data = {
          username: this.username,
          password: this.password,
          avatar: this.avatar
        };
        let self = this;
        let url = 'http://localhost:3000/signup';
        this.axios.post(url, data)
          .then((response) => {
            self.$router.push('/signin');
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
