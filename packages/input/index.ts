/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-06-10 11:13:40
 * @LastEditors: Quarter
 * @Description: 输入框组件入口
 * @FilePath: /simple-ui/packages/input/index.ts
 */
import Input from "./src/input.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SInput", Input);
  },
} as PluginObject<any>;

export * from "./src/types";
export { Input };
