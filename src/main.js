import Vue from 'vue';
import Vuetify from './plugins/vuetify';
import App from './App';
// import Info from '@/component/info';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Vuetify,
  render: (h) => h(App)
});
