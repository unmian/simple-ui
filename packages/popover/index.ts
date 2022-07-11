/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-04-11 12:30:30
 * @LastEditors: Quarter
 * @Description: 冷却按钮组件入口
 * @FilePath: /simple-ui/packages/popover/index.ts
 */
import Popover from "./src/popover.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPopover", Popover);
  },
} as PluginObject<any>;

export {
  Popover,
};