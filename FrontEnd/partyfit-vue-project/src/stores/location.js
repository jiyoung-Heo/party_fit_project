import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
const REST_SEARCH_API = 'http://localhost:8080/api'
export const useLocationStore = defineStore(
  "location",
  () => {
    const locationList = ref([])
    const findLocation = function (text) {
      axios({
        url: `${REST_SEARCH_API}/getLocations`,
        method: "GET",
        params: {
            query: text,
            // display: 10,
            // start: 1,
            // sort: "random",
        }
      })
        .then((res) => {
          res.data.items.forEach((location,index) => {
            location.isOpen = false;
            location.mapId = index;
          });
          locationList.value = res.data.items
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
        locationList,
        findLocation,
    }
  },
  { persist: true }
);
