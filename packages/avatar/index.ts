/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:42:35
 * @LastEditTime: 2022-12-14 08:42:25
 * @LastEditors: Quarter
 * @Description: 头像组件入口
 * @FilePath: /simple-ui/packages/avatar/index.ts
 */
import Avatar from "./src/avatar.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SAvatar", Avatar);
  },
};

type AvatarInstance = InstanceType<typeof Avatar>;

export default plugin;
export * from "./src/types";
export { Avatar, AvatarInstance };
