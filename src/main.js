import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";
import Vuelidate from "vuelidate";
// This is used for top level configurations on the project
// some dependencies that will be used in the project must be referenced here.
// router is imported and referenced in the mount app section so that it will be available all through the application.

import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"

Vue.config.productionTip = false

// the code block below is a global filter used in the application to set currency
Vue.filter("currency", (value) => new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD" }).format(value));

Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
