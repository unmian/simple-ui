/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-04-11 12:30:16
 * @LastEditors: Quarter
 * @Description: 描述组件入口
 * @FilePath: /simple-ui/packages/path/index.ts
 */
import Path from "./src/path.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPath", Path);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  Path,
};