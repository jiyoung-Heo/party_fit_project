import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import MyFitView from "@/views/MyFitView.vue";
import MyPartyFitView from "@/views/MyPartyFitView.vue";
import AllPartyFitView from "@/views/AllPartyFitView.vue";
import UserView from "@/views/UserView.vue";
import UserLogin from "@/components/user/UserLogin.vue";
import UserCreate from "@/components/user/UserCreate.vue";
import UserMyPage from "@/components/user/UserMyPage.vue";
import UserUpdate from "@/components/user/UserUpdate.vue";
import UserChangePW from "@/components/user/UserChangePW.vue";
import UserFindLoginId from "@/components/user/UserFindLoginId.vue";
import UserFindPW from "@/components/user/UserFindPW.vue";
import PartyFitView from "@/views/PartyFitView.vue";
import ArticleCreate from "@/components/article/ArticleCreate.vue";
import PartyMain from "@/components/partyfit/PartyMain.vue";
import FreeBoard from "@/components/article/FreeBoard.vue";
import IntroductionBoard from "@/components/article/IntroductionBoard.vue";
import NoticeBoard from "@/components/article/NoticeBoard.vue";
import MeetList from "@/components/meet/MeetList.vue";
import MeetCreate from "@/components/meet/MeetCreate.vue";
import MeetDetail from "@/components/meet/MeetDetail.vue";
import BeforeLoginMainView from "@/views/BeforeLoginMainView.vue";
import memberRequestManage from "@/components/management/memberRequestManage.vue";
import memberList from "@/components/management/memberList.vue";
import { useUserStore } from "@/stores/user";
import ArticleDetail from "@/components/article/ArticleDetail.vue";
import PartyArticleList from "@/components/management/managePartyArticleList.vue";
import ReviewBoard from "@/components/article/ReviewBoard.vue";
import MeetRequestDetail from "@/components/management/meetRequestDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainView,
      children: [
        {
          path: "/my-fit",
          name: "myFit",
          component: MyFitView,
          beforeEnter: (to, from, next) => {
            const store = useUserStore();
            // console.log(store.accessToken)
            if (
              store.accessToken !== null &&
              (store.accessToken !== "" &&
                store.accessToken !== "Bearer undefined")
            ) {
              next();
            } else {
              window.alert("로그인하시오");
              next({ name: "login" });
            }
          },
        },
        {
          path: "/my-party-fit",
          name: "myPartyFit",
          component: MyPartyFitView,
          beforeEnter: (to, from, next) => {
            const store = useUserStore();
            // console.log(store.accessToken)
            if (
              store.accessToken !== null &&
              (store.accessToken !== "" &&
                store.accessToken !== "Bearer undefined")
            )  {
              next();
            } else {
              window.alert("로그인하시오");
              next({ name: "login" });
            }
          },
        },
        {
          path: "/all-party-fit",
          name: "allPartyFit",
          component: AllPartyFitView,
        },
        {
          path: "/main",
          name: "beforeLoginMain",
          component: BeforeLoginMainView,
        },
        {
          path: "/login",
          name: "login",
          component: UserLogin,
        },
        {
          path: "/signup",
          name: "signup",
          component: UserCreate,
        },
        {
          path: "/myPage",
          name: "myPage",
          component: UserMyPage,
        },
        {
          path: "/update",
          name: "update",
          component: UserUpdate,
        },
        {
          path: "/changePW",
          name: "changePW",
          component: UserChangePW,
        },
        {
          path: "/findLoginId",
          name: "findLoginId",
          component: UserFindLoginId,
        },
        {
          path: "/findPassword",
          name: "findPassword",
          component: UserFindPW,
        },
        {
          path: "/partyfit",
          name: "partyfit",
          component: PartyFitView,
          children: [
            {
              path: "/partyfit/:partyId",
              name: "partyfitmain",
              component: PartyMain,
            },
            {
              path: "/partyfit/createArticle/:partyId",
              name: "createArticle",
              component: ArticleCreate,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                if (currentStatus != 1) {
                  alert("카페가입자만 작성 가능합니다.");
                } else {
                  next();
                }
              },
            },
            {
              path: "/partyfit/article/:partyId/:articleId",
              name: "articleDetail",
              component: ArticleDetail,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                if (currentStatus != 1) {
                  alert("카페가입자만 조회가능합니다.");
                } else {
                  next();
                }
              },
              props: true,
            },

            {
              path: "/partyfit/:partyId/0",
              name: "freeboard",
              component: FreeBoard,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                if (currentStatus != 1) {
                  alert("카페가입자만 조회가능합니다.");
                } else {
                  next();
                }
              },
            },

            {
              path: "/partyfit/:partyId/1",
              name: "introductionboard",
              component: IntroductionBoard,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                if (currentStatus != 1) {
                  alert("카페가입자만 조회가능합니다.");
                } else {
                  next();
                }
              },
            },
            {
              path: "/partyfit/:partyId/2",
              name: "noticeboard",
              component: NoticeBoard,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                console.log(currentStatus);
                if (currentStatus != 1) {
                  alert("카페가입자만 조회가능합니다.");
                } else {
                  next();
                }
              },
            },

            {
              path: "/partyfit/:partyId/3",
              name: "reviewboard",
              component: ReviewBoard,
            },
            {
              path: "/partyfit/:partyId/meetlist",
              name: "meetlist",
              component: MeetList,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                if (currentStatus != 1) {
                  alert("카페가입자만 조회가능합니다.");
                } else {
                  next();
                }
              },
            },
            {
              path: "/partyfit/:partyId/:meetId",
              name: "meetdetail",
              component: MeetDetail,
            },
            {
              path: "/partyfit/:partyId/meetcreate",
              name: "meetcreate",
              component: MeetCreate,
              beforeEnter: async (to, from, next) => {
                const partyId = to.params.partyId;
                const userStore = useUserStore();
                const currentStatus = await userStore.partyStatus(partyId);
                if (currentStatus != 1) {
                  alert("카페가입자만 조회가능합니다.");
                } else {
                  next();
                }
              },
            },

            {
              path: "/manageRequest/:partyId",
              name: "manageRequest",
              component: memberRequestManage,
            },
            {
              path: "/manageRequest/:partyId/:meetId",
              name: "meetManageDetail",
              component: MeetRequestDetail,
            },
            {
              path: "/manageMember/:partyId",
              name: "manageMember",
              component: memberList,
            },
            {
              path: "/manageArticle/:partyId",
              name: "manageArticle",
              component: PartyArticleList,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
