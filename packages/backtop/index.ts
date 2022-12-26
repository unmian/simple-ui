/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:46:48
 * @LastEditTime: 2022-12-14 08:42:53
 * @LastEditors: Quarter
 * @Description: 返回顶部组件入口
 * @FilePath: /simple-ui/packages/backtop/index.ts
 */
import Backtop from "./src/backtop.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SBacktop", Backtop);
  },
};

type BacktopInstance = InstanceType<typeof Backtop>;

export default plugin;
export * from "./src/types";
export { Backtop, BacktopInstance };
