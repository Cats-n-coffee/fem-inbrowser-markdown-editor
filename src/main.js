import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/index";
import "/src/assets/styles/main.scss";

createApp(App).use(store).mount("#app");
