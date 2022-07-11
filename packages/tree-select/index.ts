/*
 * @Author: Quarter
 * @Date: 2022-04-08 03:34:03
 * @LastEditTime: 2022-06-10 11:17:35
 * @LastEditors: Quarter
 * @Description: 树型下拉框组件入口
 * @FilePath: /simple-ui/packages/tree-select/index.ts
 */
import TreeSelect from "./src/tree-select.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STreeSelect", TreeSelect);
  },
} as PluginObject<any>;

export * from "./src/types";
export { TreeSelect };
