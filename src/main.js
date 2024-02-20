import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuecookies from 'vue-cookies'
 
createApp(App).use(store).use(router).use(vuecookies).mount('#app')
