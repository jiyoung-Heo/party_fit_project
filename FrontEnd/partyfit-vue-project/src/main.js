import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

// import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./assets/css/font.css"
import "bootstrap-icons/font/bootstrap-icons.css"
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

app.mount("#app");
