import Vue from 'vue';
import App from './App'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store/';
import Index from './views/Index';
import routes from './router/index';
import bus from './utils/bus';
import axios from 'axios';

// 默认发送api时候带着cookie
axios.defaults.withCredentials = true;

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
    routes
})

router.beforeEach(({path}, from, next) => {
  next();
})

/**
* vue-bus 设置访问api地址
*/
bus.host = 'http://localhost:3000'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

// const app = new Vue({
//   store,
//   router
// }).$mount('#app')
