import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MyFitView from '@/views/MyFitView.vue'
import MyPartyFitView from '@/views/MyPartyFitView.vue'
import AllPartyFitView from '@/views/AllPartyFitView.vue'
import UserView from '@/views/UserView.vue'
import UserLogin from '@/components/user/UserLogin.vue'
import UserCreate from '@/components/user/UserCreate.vue'
import UserMyPage from '@/components/user/UserMyPage.vue'
import UserUpdate from '@/components/user/UserUpdate.vue'
import UserChangePW from '@/components/user/UserChangePW.vue'
import UserFindLoginId from '@/components/user/UserFindLoginId.vue'
import UserFindPW from '@/components/user/UserFindPW.vue'
import PartyFitView from '@/views/PartyFitView.vue'
import ArticleCreate from '@/components/article/ArticleCreate.vue'
import PartyMain from '@/components/partyfit/PartyMain.vue'
import FreeBoard from '@/components/article/FreeBoard.vue'
import IntroductionBoard from '@/components/article/IntroductionBoard.vue'
import NoticeBoard from '@/components/article/NoticeBoard.vue'
import MeetList from '@/components/meet/MeetList.vue'
import MeetCreate from '@/components/meet/MeetCreate.vue'
import MeetListDetail from '@/components/meet/MeetListDetail.vue'
import BeforeLoginMainView from '@/views/BeforeLoginMainView.vue'
import memberRequestManage from '@/components/management/memberRequestManage.vue'
import memberList from '@/components/management/memberList.vue'
import { useUserStore } from '@/stores/user'
import ArticleDetail from '@/components/article/ArticleDetail.vue'
import PartyArticleList from '@/components/management/managePartyArticleList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      children: [
        {
          path: '/my-fit',
          name: 'myFit',
          component: MyFitView,
          beforeEnter: (to, from, next) => {
            const store = useUserStore();
            console.log(store.accessToken)
            if (store.accessToken !== "" && store.accessToken !=="Bearer undefined") {
              next() 
            } else {
              
              window.alert("로그인하시오")
              next({ name: 'login' })
            }
          }
        },
        {
          path: '/my-party-fit',
          name: 'myPartyFit',
          component: MyPartyFitView,
          beforeEnter: (to, from, next) => {
            const store = useUserStore();
            console.log(store.accessToken)
              if (store.accessToken !== "" && store.accessToken !=="Bearer undefined") {
              next() 
            } else {
              window.alert("로그인하시오")
              next({ name: 'login' })
            }
          }
        },
        {
          path: '/all-party-fit',
          name: 'allPartyFit',
          component: AllPartyFitView
        },
        {
          path: '/main',
          name: 'beforeLoginMain',
          component: BeforeLoginMainView,
        },
        {
          path: '/login',
          name: 'login',
          component: UserLogin,
        },
        {
          path: '/signup',
          name: 'signup',
          component: UserCreate,
        },
        {
          path: '/myPage',
          name: "myPage",
          component: UserMyPage,

        },
        {
          path: '/update',
          name: "update",
          component: UserUpdate,

        },
        {
          path: '/changePW',
          name: 'changePW',
          component: UserChangePW,
        },
        {
          path: '/findLoginId',
          name: 'findLoginId',
          component: UserFindLoginId,
        },
        {
          path: '/findPassword',
          name: 'findPassword',
          component: UserFindPW,
        },
        {
          path: '/partyfit',
          name: 'partyfit',
          component: PartyFitView,
          children: [
            {
              path: '/partyfit/:partyId',
              name: 'partyfitmain',
              component: PartyMain,
            },
            {
              path: '/partyfit/createArticle/:partyId',
              name: 'createArticle',
              component: ArticleCreate,
            },
            {
              path: '/partyfit/article/:articleId',
              name: 'articleDetail',
              component: ArticleDetail,
              props: true,
            },


            {
              path: '/partyfit/:partyId/0',
              name: 'freeboard',
              component: FreeBoard,
            },

            {
              path: '/partyfit/:partyId/1',
              name: 'introductionboard',
              component: IntroductionBoard,
            },
            {
              path: '/partyfit/:partyId/2',
              name: 'noticeboard',
              component: NoticeBoard,
            },
            {
              path: '/partyfit/:partyId/meetlist',
              name: 'meetlist',
              component: MeetList,
            },
            {
              path: '/partyfit/:partyId/meetdetail',
              name: 'meetdetail',
              component: MeetListDetail,
            },
            {
              path: '/partyfit/:partyId/meetcreate',
              name: 'meetcreate',
              component: MeetCreate,
            },
    
            {
              path: '/manageRequest/:partyId',
              name: 'manageRequest',
              component: memberRequestManage,
            },
    
            {
              path: '/manageMember/:partyId',
              name: 'manageMember',
              component: memberList,
            },
            {
              path: '/manageArticle/:partyId',
              name: 'manageArticle',
              component: PartyArticleList,
            },
          ]
        },
      ]
    },
  ]
})

export default router
