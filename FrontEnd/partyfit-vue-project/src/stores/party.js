import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const REST_USER_API = `http://localhost:8080/party`;

export const usePartyStore = defineStore("party", () => {
    const partyList = ref()
    const getPartyListWithMemberCount = function(condition){
        axios({
            url: `${REST_USER_API}/top`,
            method: "GET"
        }).then(res => {
            partyList.value = res.data
        }).catch(err => {
            console.log(err)
        })
    }

    const selectedParty = ref()
    const partyMemberList = ref([])

    const getMemberList = function(partyId){
        axios({
            url: `${REST_USER_API}/${partyId}/member/1`,
            method: "GET",
            params: {
                partyId
            }
        }).then(res => {
            partyMemberList.value = res.data
            // console.log(partyMemberList.value)
        }).catch(err => {
            console.log(err)
        })
    }
    

  return {
    partyList,
    getPartyListWithMemberCount,
    selectedParty,
    getMemberList,
    partyMemberList
  };
},{persist:true});
