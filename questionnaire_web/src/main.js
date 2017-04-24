import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store/';
import Index from './views/Index';
import routes from './router/index';
import bus from './utils/bus';
import axios from 'axios';

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

const app = new Vue({
  store,
  router
}).$mount('#app')
