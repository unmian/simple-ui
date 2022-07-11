/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:46:48
 * @LastEditTime: 2022-06-10 11:12:50
 * @LastEditors: Quarter
 * @Description: 返回顶部组件入口
 * @FilePath: /simple-ui/packages/backtop/index.ts
 */
import Backtop from "./src/backtop.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SBacktop", Backtop);
  },
} as PluginObject<any>;

export * from "./src/types";
export { Backtop };
