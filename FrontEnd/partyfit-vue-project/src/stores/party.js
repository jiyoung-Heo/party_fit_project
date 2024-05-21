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
          console.log("success");
          partyList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const selectedParty = ref();
    const partyMemberList = ref([]);

    //해당 party의 참여 인원 조회
    const isjoining=ref()
    const isManager=ref()
    const getMemberList = async function (status) {
     await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/member/${status}`,
        method: "GET",
        
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          partyMemberList.value = res.data;
          console.log(partyMemberList.value)
          for(let i=0;i<partyMemberList.value.length;i++){
         console.log(partyMemberList.value[i].userId)
            if(partyMemberList.value[i].userId===useStore.loginUser.userId){
              console.log("속해있음")
              if(partyMemberList.value[i].grade===1){
                console.log("매니져.")
                isManager.value=true;
                break;
              }else{
                isjoining.value=true;
                
                console.log("일반.")
                break;
              }
              
            }else{
              
              console.log("안속해")
              isjoining.value=false;
              
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
    const getFreeList = function (partyId, orderBy, orderByDir) {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/0`,
        method: "GET",
        params: {
          partyId: partyId,
          category: 0,
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

    //게시글 상세조회
    //isReload : false - 조회수 +1,
    const articleDetail = ref();
    const getArticleDetail = async function (articleId, isReload) {
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
        articleDetail.value = res.data;
      });
    };

    //댓글리스트 가져오기
    const commentList = ref([]);

    const getCommentList = async function(articleId,who) {
      console.log(articleId+" "+who)
      await axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}/comment`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          commentList.value = res.data;
          // console.log(commentList.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };


    //게시글 작성 
    const makeArticle = function (data) {
      axios({
        url: `${REST_USER_API}/${data.partyId}/article/${data.category}`,
        method: "POST",
        data: data,
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //댓글 작성하기 
    const createComment = async function (articleId,content,parentId,username,profile,userId,depth) {
    // const createComment = function (comment) {
      // console.log(comment);
      axios({url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}/comment`,
      method: "POST",
      headers: {
        Authorization : useStore.accessToken,
    },
    data: {
      // comment
      
      articleId,content,parentId,username,profile,userId,depth
    },})
    .then((res) => {
console.log(res.data)
    })
    .catch((err) => {
 
    });
  }

// 글 삭제 
const deleteArticle = function (articleId) {
  axios({url: `${REST_USER_API}/${selectedParty.value.partyId}/article/${articleId}`,
  method: "DELETE",
  headers: {
    Authorization : useStore.accessToken,
},
})
.then((res) => {
console.log(res.data)
})
.catch((response) => {
  if (response.status === 204) {
    // 데이터를 삭제했을 경우
    console.log('Article deleted successfully');
    // TODO: 추가적인 처리 로직 작성
  } else if (response.status === 404) {
    // 삭제할 데이터가 없는 경우
    console.error('Article not found');
    // TODO: 추가적인 처리 로직 작성
  }
});
  
}

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
    const memberRequestList = ref([])
    const getMemberRequestList = function() {
      axios({
        url: `${REST_USER_API}/${selectedParty.value.partyId}/management/join`,
        method: "GET",
        headers: {
          Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
        },
      })
      .then((res) => {
      console.log("getReq")
      memberRequestList.value = res.data;
      console.log(memberRequestList.value)
    })
    .catch((err) => {
      console.log(err);
    });
};

//가입 요청 수락
const approveRequest = function(user) {

  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/management/join/true`,
    method: "PUT",
    data: user,
    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res)=>{
    console.log(res.data)
  })
}

//가입 요청 거절
const rejectRequest = function(user) {
  
  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/management/join/false`,
    method: "PUT",
    data: user,
    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res)=>{
    console.log(res.data)
   
  })
}


// 모임 조회 (0:승인 대기 , 1: 모집중 , 2:정원마감)
const selectedMeet = ref()
const meetRequestList = ref([])
const meetList = ref([])
const meetFullList = ref([])
const getMeetList = function(status, condition) {
  console.log(status)
  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/meet/${status}`,
    method: "GET",
    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res) => {
    if(status===0)
      meetRequestList.value = res.data;
    else if(status===1)
      meetList.value = res.data;
    else if(status===2)
      meetFullList.value = res.data;

      console.log("getMeet")
      console.log(meetRequestList.value)
    })
    .catch((err) => {
      console.log(err);
    });
};

//가입 요청 수락
const meetapproveRequest = function(meetId) {

  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/management/meet/${meetId}/true`,
    method: "PUT",
    
    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res)=>{
    console.log(res.data)
  })
}

//가입 요청 거절
const meetrejectRequest = function(meetId) {
  
  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/management/meet/${meetId}/false`,
    method: "PUT",
    
    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res)=>{
    console.log(res.data)
   
  })
}

//모임가입신청
const meetjoinRequest = function(meetId){
  console.log((meetId) +" " +(useStore.loginUser.userId))
  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/meet/${meetId}/${useStore.loginUser.userId}`,
    method: "PUT",

    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res)=>{
    console.log("가입신청함")
    
  })

}

//모임 내부 멤버 조회 
const meetMemberList = ref([])
const getMeetMemberList = function(meetId) {
  axios({
    url: `${REST_USER_API}/${selectedParty.value.partyId}/meet/${meetId}/member`,
    method: "GET",

    headers: {
      Authorization: useStore.accessToken, // 헤더에 accessToken을 포함하여 요청
    },
  })
  .then((res)=>{
    console.log("멤버 조회")
    meetMemberList.value = res.data;
  })}
 

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
    };
  },
  { persist: true }
);
