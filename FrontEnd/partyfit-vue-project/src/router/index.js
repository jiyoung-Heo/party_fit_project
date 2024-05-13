import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MyFitView from '@/views/MyFitView.vue'
import MyPartyFitView from '@/views/MyPartyFitView.vue'
import AllPartyFitView from '@/views/AllPartyFitView.vue'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
