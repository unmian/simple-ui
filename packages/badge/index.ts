/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:51:44
 * @LastEditTime: 2022-04-11 12:20:17
 * @LastEditors: Quarter
 * @Description: 标记组件入口
 * @FilePath: /simple-ui/packages/badge/index.ts
 */
import Badge from "./src/badge.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SBadge", Badge);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  Badge,
};