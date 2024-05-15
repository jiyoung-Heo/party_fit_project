import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MyFitView from '@/views/MyFitView.vue'
import MyPartyFitView from '@/views/MyPartyFitView.vue'
import AllPartyFitView from '@/views/AllPartyFitView.vue'
import UserView from '@/views/UserView.vue'
import UserLogin from '@/components/user/UserLogin.vue'
import UserCreate from '@/components/user/UserCreate.vue'
import UserDetail from '@/components/user/UserDetail.vue'
import UserUpdate from '@/components/user/UserUpdate.vue'
import UserChangePW from '@/components/user/UserChangePW.vue'
import UserFindLoginId from '@/components/user/UserFindLoginId.vue'
import UserFindPW from '@/components/user/UserFindPW.vue'

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
      component: UserView,
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
        {
          path:'/myPage',
          name:"myPage",
          component : UserDetail,
          
        },
        {
          path:'/update',
          name:"update",
          component : UserUpdate,
          
        },
        {
          path:'/changePW',
          name :'changePW',
          component : UserChangePW,
        },
        {
          path:'/findLoginId',
          name :'findLoginId',
          component : UserFindLoginId,
        },
        {
          path:'/findPassword',
          name :'findPassword',
          component : UserFindPW,
        }
        
  
      ]

    },

  ]
})

export default router
