import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import { routes } from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins',
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
