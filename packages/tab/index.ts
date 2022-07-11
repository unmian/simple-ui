/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:09:43
 * @LastEditTime: 2022-04-11 12:33:12
 * @LastEditors: Quarter
 * @Description: 标签页组件入口
 * @FilePath: /simple-ui/packages/tab/index.ts
 */
import Tab from "./src/tab.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STab", Tab);
  },
} as PluginObject<any>;

export {
  Tab,
};