/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-04-11 12:22:41
 * @LastEditors: Quarter
 * @Description: 冷却按钮组件入口
 * @FilePath: /simple-ui/packages/cool-button/index.ts
 */
import CoolButton from "./src/cool-button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SCoolButton", CoolButton);
  },
} as PluginObject<any>;

export {
  CoolButton,
};