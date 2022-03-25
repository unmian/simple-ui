/*
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 03:34:14
 * @Description: 函数主入口
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SimpleUIPlugin from "packages";

Vue.use(SimpleUIPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
