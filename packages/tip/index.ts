/*
 * @Author: Quarter
 * @Date: 2022-04-08 01:33:56
 * @LastEditTime: 2022-04-11 12:34:31
 * @LastEditors: Quarter
 * @Description: 提示组件入口
 * @FilePath: /simple-ui/packages/tip/index.ts
 */
import Tip from "./src/tip.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STip", Tip);
  },
} as PluginObject<any>;

export {
  Tip,
};