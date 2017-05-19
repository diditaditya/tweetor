import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import TweetRiver from '@/components/TweetRiver'
import Signin from '@/components/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TweetRiver',
      component: TweetRiver
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
