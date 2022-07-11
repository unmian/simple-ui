/*
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-06 01:07:53
 * @Description: 函数主入口
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SimpleUIPlugin from "@quarter/simple-ui";

Vue.use(SimpleUIPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
