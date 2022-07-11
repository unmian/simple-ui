/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:01:59
 * @LastEditTime: 2022-04-11 12:21:07
 * @LastEditors: Quarter
 * @Description: 按钮组件入口
 * @FilePath: /simple-ui/packages/button/index.ts
 */
import Button from "./src/button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SButton", Button);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  Button,
};