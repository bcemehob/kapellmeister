import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./styles/styles.css";
createApp(App).use(store).mount('#app')
