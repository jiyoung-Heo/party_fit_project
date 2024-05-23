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
    const getPartyListWithCondition = function (condition) {
      axios({
        url: `${REST_USER_API}`,
        method: "GET",
        params: condition,
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          // console.log("success");
          partyList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getOneParty = async function (partyId) {
      await axios({
        url: `${REST_USER_API}/${partyId}`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          selectedParty.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const selectedParty = ref();
    const partyMemberList = ref([]);

    //해당 party의 참여 인원 조회

    const isjoining = ref(false);
    const isManager = ref(false);
    const getMemberList = async function (partyId, status) {
      await axios({
        url: `${REST_USER_API}/${partyId}/member/${status}`,
        method: "GET",

        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          partyMemberList.value = res.data;
          for (let i = 0; i < partyMemberList.value.length; i++) {
            // console.log(partyMemberList.value[i].userId)
            if (partyMemberList.value[i].userId === useStore.loginUser.userId) {
              //console.log("속해있음")
              if (partyMemberList.value[i].grade === 1) {
                //console.log("매니져.")
                isManager.value = true;
                break;
              } else {
                isjoining.value = true;

                // console.log("일반.");
                break;
              }
            } else {
              // console.log("안속해");
              isjoining.value = false;
            }
          }
        })
        .catch((err) => {
          console.log("에러남 " + err);
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
    const getFreeList = async function (partyId, orderBy, orderByDir,category,key,word) {
      await axios({
        url: `${REST_USER_API}/${partyId}/article/${category}`,
        method: "GET",
        params: {
          partyId: partyId,
          category: 0,
          key:key,
          word:word,
          orderBy: orderBy,
          orderByDir: orderByDir,
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
    const getHotViewList = function (partyId, category) {
      axios({
        url: `${REST_USER_API}/${partyId}/article/${category}`,
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
          // console.log(hotViewList.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //게시글 상세조회
    //isReload : false - 조회수 +1,
    const articleDetail = ref();
    const getArticleDetail = async function (articleId, isReload) {
      // console.log(selectedParty.value.partyId + " " + articleId + " " + isReload);
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}/${isReload}`,
        method: "GET",
        params: {
          partyId: selectedParty.value.partyId,
          articleId: articleId,
          isReload: isReload,
        },
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        console.log(res.data)
        articleDetail.value = res.data;
      });
    };

    //댓글리스트 가져오기
    const commentList = ref(null);

    const getCommentList = async function (articleId) {
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}/comment`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          commentList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //게시글 작성
    const makeArticle = function (data, category) {
      axios({
        url: `${REST_USER_API}/${data.partyId}/article/${category}`,
        method: "POST",
        data: data,
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          router.go(-1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //댓글 작성하기
    const createComment = async function (articleId, comment) {
      // const createComment = function (comment) {
      // console.log(comment);
      axios({
        url: `${REST_USER_API}/${selectedParty.partyId}/article/${articleId}/comment`,
        method: "POST",
        headers: {
          Authorization: useStore.accessToken,
        },
        data: comment,
      })
        .then((res) => {
          commentList.value = res.data;
          // console.log(res.data);
        })
        .catch((err) => {});
    };

    // 글 삭제
    const deleteArticle = async function (articleId) {
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}`,
        method: "DELETE",
        headers: {
          Authorization: useStore.accessToken,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((response) => {
          if (response.status === 204) {
            // 데이터를 삭제했을 경우
            console.log("Article deleted successfully");
            // TODO: 추가적인 처리 로직 작성
          } else if (response.status === 404) {
            // 삭제할 데이터가 없는 경우
            console.error("Article not found");
            // TODO: 추가적인 처리 로직 작성
          }
        });
    };

    //댓글 삭제

    const deleteComment = function (articleId, commentId) {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}/comment/${commentId}`,
        method: "DELETE",
        headers: {
          Authorization: useStore.accessToken,
        },
      })
        .then((res) => {
          commentList.value = res.data;
          // console.log(res.data);
        })
        .catch((response) => {
          if (response.status === 204) {
            // 데이터를 삭제했을 경우
            console.log("Article deleted successfully");
            // TODO: 추가적인 처리 로직 작성
          } else if (response.status === 404) {
            // 삭제할 데이터가 없는 경우
            console.error("Article not found");
            // TODO: 추가적인 처리 로직 작성
          }
        });
    };
    //댓글수정
    const updateComment = function (articleId, commentId, content) {
      // console.log(content)
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}/comment/${commentId}`,
        method: "PUT",
        data: { content: content },
        headers: {
          Authorization: useStore.accessToken,
        },
      }).then((res) => {
        commentList.value = res.data;
        // console.log(res.data);
      });
    };

    //파티에 속해있는지 여부

    const IsLike = ref(false);
    const getIsLike = function (commentId) {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${commentId}/comment/like`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          IsLike.value = true;
          console.log(IsLike.value);
        })
        .catch((err) => {
          IsLike.value = false;
        });
    };

    //모임 생성
    const makeMeetRequest = function (data, partyId) {
      data.userId = useStore.loginUserId;
      
            axios({
        url: `${REST_USER_API}/${partyId}/meet`,
        method: "POST",
        data: data,
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          router.push({ name: "partyfitmain", params: { partyId: partyId } });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //가입요청 목록
    const memberRequestList = ref([]);
    const isWaiting = ref(false);
    const getMemberRequestList = function (partyId) {
      axios({
        url: `${REST_USER_API}/${partyId}/management/join`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          // console.log("getReq")
          memberRequestList.value = res.data;
          // console.log(memberRequestList.value)
        })
        .catch((err) => {
          console.log(err);
        });
    };


    //가입 요청 수락
    const approveRequest = function (user) {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/management/join/true`,
        method: "PUT",
        data: user,
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        console.log(res.data);
      });
    };

    //가입 요청 거절
    const rejectRequest = async function (user) {
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/management/join/false`,
        method: "PUT",
        data: user,
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        // console.log(res.data);
      });
    };

    // 모임 조회 (0:승인 대기 , 1: 모집중 , 2:정원마감)
    const selectedMeet = ref();
    const meetRequestList = ref([]);
    const meetList = ref([]);
    const meetFullList = ref([]);
    const getMeetList = async function (status, condition) {
      // console.log(status);
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/meet/${status}`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          if (status === 0) meetRequestList.value = res.data;
          else if (status === 1) meetList.value = res.data;
          else if (status === 2) meetFullList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    const getOneMeet = async function(meetId) {
      try {
        const response = await axios({
          url: `${REST_USER_API}/${selectedParty.value.partyId}/meet`,
          method: "GET",
          params: { meetId: meetId },
          headers: {
            Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
          },
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
    };
    

    //가입 요청 수락
    const meetapproveRequest = function (meetId) {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/management/meet/${meetId}/true`,
        method: "PUT",

        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        console.log(res.data);
      });
    };

    //가입 요청 거절
    const meetrejectRequest = function (meetId) {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/management/meet/${meetId}/false`,
        method: "PUT",

        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        console.log(res.data);
      });
    };

    //모임가입신청
    const meetjoinRequest = async function (meetId) {
      // console.log(meetId + " " + useStore.loginUser.userId);
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/meet/${meetId}/${useStore.loginUser.userId}`,
        method: "PUT",

        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        getMeetMemberList(meetId)
        // console.log("가입신청함");
      });
    };

    //모임가입신청취소
    const canceljoinRequest = async function (meetId) {
      // console.log(meetId + " " + useStore.loginUser.userId);
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/meet/${meetId}/${useStore.loginUser.userId}`,
        method: "DELETE",

        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        getMeetMemberList(meetId)
        // console.log("가입신청함");
      });
    };

    //모임 내부 멤버 조회
    const meetMemberList = ref([]);
    const getMeetMemberList =  async function (partyId,meetId) {
      await axios({
        url: `${REST_USER_API}/${partyId}/meet/${meetId}/member`,
        method: "GET",

        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      }).then((res) => {
        // console.log("멤버 조회완");
        meetMemberList.value = res.data;
      });
    };

    function $reset() {
      partyList.value = null;
      selectedParty.value = null;
      partyMemberList.value = null;
      noticeList.value = null;
      freeList.value = null;
      introductionList.value = null;
      hotViewList.value = null;
      articleDetail.value = null;
      IsLike.value = false;
      commentList.value = null;
      isManager.value = false;
      isjoining.value = false;
      meetRequestList.value = null;
      memberRequestList.value = null;
      meetList.value = null;
      meetFullList.value = null;
      meetMemberList.value = null;
      selectedMeet.value = null;
    }

    return {
      makeArticle,
      getPartyListWithCondition,
      partyList,
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
      articleDetail,
      getArticleDetail,
      IsLike,
      getIsLike,
      commentList,
      getCommentList,
      createComment,
      deleteArticle,
      deleteComment,
      makeMeetRequest,
      isManager,
      isjoining,
      getMemberRequestList,
      approveRequest,
      rejectRequest,
      meetRequestList,
      getMeetList,
      meetapproveRequest,
      meetrejectRequest,
      memberRequestList,
      meetList,
      meetFullList,
      meetjoinRequest,
      meetMemberList,
      getMeetMemberList,
      selectedMeet,
      isWaiting,
      $reset,
      updateComment,
      canceljoinRequest,
      getOneParty,
      getOneMeet,
    };
  },
  { persist: true }
);
