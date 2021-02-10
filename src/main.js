import Vue from 'vue';
import App from './components/app/App';
import store from './store';
import {createApi} from './api';
import vueCustomElement from 'vue-custom-element';
import 'document-register-element/build/document-register-element';

// Before you create app
Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.prototype.$api = store.$api = createApi();
Vue.use(vueCustomElement);

App.store = store;
const app = Vue.customElement('weather-widget', App);

// After you create app
if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
}
