// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)

import {store} from "./store";

import vuexI18n from 'vuex-i18n';
Vue.use(vuexI18n.plugin, store);

import langRU from './lang/ru/';
Vue.i18n.add('ru', langRU);

Vue.i18n.set('ru');

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'
Vue.use(ElementUI, {locale});

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.root = process.env.NODE_ENV === 'development'
  ? 'http://v2.api.blockstory.ru/'
  : 'http://v2.api.blockstory.ru/';

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.status !== 200){
      alert(JSON.stringify(response));
    }
  });
});

import 'vue-croppa/dist/vue-croppa.min.css';
import Croppa from 'vue-croppa';
Vue.use(Croppa);
//
// import Meta from 'vue-meta'
// Vue.use(Meta);

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue';
Vue.component('icon', Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
