import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store/';
import Index from './views/Index';
import routes from './router/index';
import bus from './utils/bus';
// import axios from 'axios';
// import VueResource from 'vue-resource';


Vue.use(ElementUI);
Vue.use(VueRouter);
// Vue.use(VueResource);

const router = new VueRouter({
    routes
})

router.beforeEach(({path}, from, next) => {
  // if(path === '/') return next({ path: '/questionList' });

  next();
})

/**
* vue-bus 设置
*/
// bus.host = 'http://192.168.230.154:3000';
// bus.host = 'http://192.168.31.167:3000'
bus.host = 'http://localhost:3000'

const app = new Vue({
  store,
  router
}).$mount('#app')
