/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:12:23
 * @LastEditTime: 2022-04-11 12:32:52
 * @LastEditors: Quarter
 * @Description: 吸附组件入口
 * @FilePath: /simple-ui/packages/sticky/index.ts
 */
import Sticky from "./src/sticky.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SSticky", Sticky);
  },
} as PluginObject<any>;

export {
  Sticky,
};