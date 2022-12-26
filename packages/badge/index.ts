/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:51:44
 * @LastEditTime: 2022-12-14 08:43:59
 * @LastEditors: Quarter
 * @Description: 标记组件入口
 * @FilePath: /simple-ui/packages/badge/index.ts
 */
import Badge from "./src/badge.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SBadge", Badge);
  },
};

type BadgeInstance = InstanceType<typeof Badge>;

export default plugin;
export * from "./src/types";
export { Badge, BadgeInstance };
