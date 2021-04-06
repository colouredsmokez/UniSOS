import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import { auth } from "./firebase"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(function(user) {
    console.log(user);
    if (!app) {
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount("#app");
    }
});