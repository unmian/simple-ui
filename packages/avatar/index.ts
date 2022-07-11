/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:42:35
 * @LastEditTime: 2022-05-26 05:59:55
 * @LastEditors: Quarter
 * @Description: 头像组件入口
 * @FilePath: /simple-ui/packages/avatar/index.ts
 */
import Avatar from "./src/avatar.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SAvatar", Avatar);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  Avatar,
};