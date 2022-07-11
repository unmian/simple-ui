/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:20:53
 * @LastEditTime: 2022-04-11 11:14:29
 * @LastEditors: Quarter
 * @Description: 水印组件入口
 * @FilePath: /simple-ui/packages/water-mark/index.ts
 */
import SWaterMark from "./src/water-mark.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SWaterMark", SWaterMark);
  },
} as PluginObject<any>;

export {
  SWaterMark,
};