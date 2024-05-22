import { createApp } from "vue";
import { createPinia } from "pinia";
import { createNaverMap } from "vue3-naver-maps";

import App from "./App.vue";
import router from "./router";
import Editor from "@toast-ui/editor";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Swal from "vue-sweetalert2";
import FullCalendar from "@fullcalendar/vue3";

// import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "./assets/css/font.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//toast-ui
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(createNaverMap, {
  clientId: "g6ctjn17no", // Required
  // category: "ncp", // Optional
  subModules: [], // Optional
});
app.component("FullCalendar", FullCalendar);
app.use(Swal);

app.mount("#app");
