import Vue from 'vue'
import App from './App.vue'
import store from "./store";

// This is used for top level configurations on the project
// some dependencies that will be used in the project must be referenced here.

import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
