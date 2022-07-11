/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:54:40
 * @LastEditTime: 2022-04-11 12:20:46
 * @LastEditors: Quarter
 * @Description: 柱条组件入口
 * @FilePath: /simple-ui/packages/bar/index.ts
 */
import Bar from "./src/bar.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SBar", Bar);
  },
} as PluginObject<any>;

export {
  Bar,
};