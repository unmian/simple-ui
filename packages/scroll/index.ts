/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-04-11 12:31:14
 * @LastEditors: Quarter
 * @Description: 滚动条组件入口
 * @FilePath: /simple-ui/packages/scroll/index.ts
 */
import Scroll from "./src/scroll.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SScroll", Scroll);
  },
} as PluginObject<any>;

export {
  Scroll,
};