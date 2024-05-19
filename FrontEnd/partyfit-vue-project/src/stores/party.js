import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";


const REST_USER_API = `http://localhost:8080/party`;

export const usePartyStore = defineStore(
  "party",
  () => {
    const useStore = useUserStore();
    const partyList = ref();
    const getPartyListWithMemberCount = function (condition) {
      axios({
        url: `${REST_USER_API}/top`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          partyList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const selectedParty = ref();
    const partyMemberList = ref([]);

    //해당 party의 참여 인원 조회
    const getMemberList = function (partyId) {
      axios({
        url: `${REST_USER_API}/${partyId}/member/1`,
        method: "GET",
        params: {
          partyId,
        },
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          partyMemberList.value = res.data;
          // console.log(partyMemberList.value)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 전체 글 조회 category (0:자유게시판, 1: 가입인사, 2:공지사항, 3:  모임후기)

    // 공지사항 조회 최신순
    const noticeList = ref([]);
    const getNoticeList = function (partyId) {
      axios({
        url: `${REST_USER_API}/${partyId}/article/2`,
        method: "GET",
        params: {
          partyId: partyId,
          category: 2,
          orderBy: "reg_date",
          orderByDir: "DESC",
        },
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          noticeList.value = res.data;
          // console.log(noticeList.value)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 자유게시판글 조회 최신순
    const freeList = ref([]);
    const getFreeList = function (partyId) {
      axios({
        url: `${REST_USER_API}/${partyId}/article/0`,
        method: "GET",
        params: {
          partyId: partyId,
          category: 0,
          orderBy: "reg_date",
          orderByDir: "DESC",
        },
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          freeList.value = res.data;
          // console.log(freeList.value)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 가입인사글 조회 최신순
    const introductionList = ref([]);
    const getIntroductionList = function (partyId) {
      axios({
        url: `${REST_USER_API}/${partyId}/article/1`,
        method: "GET",
        params: {
          partyId: partyId,
          category: 1,
          orderBy: "reg_date",
          orderByDir: "DESC",
        },
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          introductionList.value = res.data;
          // console.log(introductionList.value)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 조회수 순 전체 게시글 조회 -> 일단은 못해서 자유게시판만..
    const hotViewList = ref([]);
    const getHotViewList = function (partyId) {
      axios({
        url: `${REST_USER_API}/${partyId}/article/0`,
        method: "GET",
        params: {
          orderBy: "view_count",
          orderByDir: "DESC",
        },
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          hotViewList.value = res.data;
          console.log(hotViewList.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      partyList,
      getPartyListWithMemberCount,
      selectedParty,
      getMemberList,
      partyMemberList,
      noticeList,
      getNoticeList,
      freeList,
      getFreeList,
      introductionList,
      getIntroductionList,
      hotViewList,
      getHotViewList,
    };
  },
  { persist: true }
);
