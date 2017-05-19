<template lang="html">
  <div class="">
    <div v-if="index < 50" v-for="(tweet, index) in tweets" class="row tweet">
      <div class="row poster">
        <span style="color: white"><b>{{ tweet.user.username }}</b></span><br>
        <span>{{ convertDate(tweet.createdAt) }} {{ convertTime(tweet.createdAt) }}</span>
      </div>
      <div class="row content">
        <p>{{ tweet.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'river',
  props: ['tweets'],
  computed: {
    shownTweets() {
      return this.$store.getters.shownTweets;
    }
  },
  methods: {
    convertDate: function(oriDate) {
      let fullDate = new Date(oriDate);
      let year = String(fullDate.getFullYear());
      let month = String(fullDate.getMonth()+1);
      if(month.length === 1) {
        month = '0' + month;
      }
      let date = String(fullDate.getDate());
      if(date.length === 1) {
        date = '0' + date;
      }
      return `${year}-${month}-${date}`;
    },
    convertTime: function(oriDate) {
      let fullDate = new Date(oriDate);
      let hour = String(fullDate.getHours());
      if(hour.length === 1) {
        hour = '0' + hour;
      }
      let minute = String(fullDate.getMinutes());
      if(minute.length === 1) {
        minute = '0' + minute;
      }
      return `${hour}:${minute}`;
    }
  },
  created: function() {
    this.$store.commit('fillShownTweets', this.tweets);
  }
}
</script>

<style lang="css">

.tweet {
  border-radius: 10px;
  background-color: slateGrey;
  margin: 5px;
  padding: 5px;
}

.poster {
  text-align: left;
  margin: 5px;
}

.content {
  color: white;
  margin: 1px;
}


</style>
