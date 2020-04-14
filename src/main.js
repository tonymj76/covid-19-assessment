import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Accept', 'text/html');
  next();
});

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
