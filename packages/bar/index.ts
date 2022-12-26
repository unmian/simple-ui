/*
 * @Author: Quarter
 * @Date: 2022-04-07 11:54:40
 * @LastEditTime: 2022-12-14 08:44:22
 * @LastEditors: Quarter
 * @Description: 柱条组件入口
 * @FilePath: /simple-ui/packages/bar/index.ts
 */
import Bar from "./src/bar.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SBar", Bar);
  },
};

type BarInstance = InstanceType<typeof Bar>;

export default plugin;
export { Bar, BarInstance };
