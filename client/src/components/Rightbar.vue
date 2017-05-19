<template lang="html">
  <div class="sidenav">
    <h4>Trending Tags</h4>
    <div class="navlist">
      <div class="list-group">
        <a v-if="index < 10" v-for="(tag, index) in tags" v-on:click="filterByTag(tag)" href="#" class="list-group-item">{{ tag }}</a>
      </div>
      <button v-on:click="backToInitial" type="button" class="btn btn-default" style="margin-bottom: 10px">Show All Tweets</button>
    </div>
    <!-- <div class="">
      <form v-on:submit.prevent="searchTags" class="from-group">
        <input v-model="searchedTags" type="text" placeholder="Search by Tags" class="form-control">
        <input type="submit" value="Search" class="btn btn-default">
      </form>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'rightbar',
  props: [],
  data: function() {
    return {
      searchedTags: []
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    }
  },
  methods: {
    checkIfLoggedIn() {
      let token = localStorage.getItem('token');
      if(token) {
        this.$store.dispatch('checkToken', token);
      }
    },
    filterByTag(tag) {
      this.$store.dispatch('filterByTag', tag);
    },
    backToInitial() {
      this.$store.dispatch('fetchTweets');
    },
    searchTags() {
      let tagArr = this.searchedTags.match(/\w+/ig);
      this.$store.dispatch('searchTags', tagArr);
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
