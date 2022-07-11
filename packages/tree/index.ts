/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:51:43
 * @LastEditTime: 2022-06-10 11:14:03
 * @LastEditors: Quarter
 * @Description: 树型组件入口
 * @FilePath: /simple-ui/packages/tree/index.ts
 */
import Tree from "./src/tree.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STree", Tree);
  },
} as PluginObject<any>;

export * from "./src/types";
export { Tree };
