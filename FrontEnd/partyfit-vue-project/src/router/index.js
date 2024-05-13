import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MyFitView from '@/views/MyFitView.vue'
import MyPartyFitView from '@/views/MyPartyFitView.vue'
import AllPartyFitView from '@/views/AllPartyFitView.vue'
import UserLogin from '@/components/user/UserLogin.vue'
import UserCreate from '@/components/user/UserCreate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      children:[
        {
          path:'/my-fit',
          name:'myFit',
          component: MyFitView,
        },
        {
          path:'/my-party-fit',
          name:'myPartyFit',
          component: MyPartyFitView,
        },
        {
          path:'/all-party-fit',
          name:'allPartyFit',
          component: AllPartyFitView
        },
        
      
      ]

    },
    {
      path: '/user',
      name: 'user',
      component: MainView,
      children:[
        {
          path:'/login',
          name:'login',
          component: UserLogin,
        },
        {
          path:'/signup',
          name:'signup',
          component: UserCreate,
        },
        
        
  
      ]

    },

  ]
})

export default router
