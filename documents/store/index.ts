/*
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 03:13:33
 * @Description: vuex配置
 */
import Vue from "vue";
import Vuex from "vuex";
import ModuleFramework from "documents/store/modules/framework";
import ModuleData from "documents/store/modules/data";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    framework: ModuleFramework,
    data: ModuleData,
  },
});
