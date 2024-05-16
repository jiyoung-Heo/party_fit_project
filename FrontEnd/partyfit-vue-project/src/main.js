import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import "./assets/css/font.css"

const app = createApp(App);
const pinia = createPinia();
import piniaPluginPersistendstate from "pinia-plugin-persistedstate"
pinia.use(piniaPluginPersistendstate);
app.use(pinia);
app.use(router);

app.mount("#app");
