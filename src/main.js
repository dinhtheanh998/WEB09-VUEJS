import { createApp } from 'vue'
import App from './App.vue'
import mitt from "mitt";
import router from "./router/router.js";
import  store from "./store/index.js"
import "./assets/font/icofont/icofont.min.css"
import "./css/reset-css.css";
import "./css/main.css";
const eventBus = mitt();
const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.eventBus = eventBus;
app.mount('#app')
