/*
 * @Author: Quarter
 * @Date: 2022-04-08 03:29:40
 * @LastEditTime: 2022-06-10 11:13:54
 * @LastEditors: Quarter
 * @Description: 下拉框组件入口
 * @FilePath: /simple-ui/packages/select/index.ts
 */
import Select from "./src/select.vue";
import Option from "./src/option.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SSelect", Select);
    vue.component("SOption", Option);
  },
} as PluginObject<any>;

export * from "./src/types";
export { Select, Option };
