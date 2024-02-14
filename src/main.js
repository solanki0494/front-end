import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';

const app = createApp(App);

// Remove prototype, use provide/inject or app.config.globalProperties
app.config.globalProperties.$http = Axios;

const accessToken = localStorage.getItem('token');
console.log(accessToken);
if (accessToken) {
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
}

app.use(router).mount('#app');
