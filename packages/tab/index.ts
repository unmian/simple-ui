/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:09:43
 * @LastEditTime: 2022-12-14 09:01:45
 * @LastEditors: Quarter
 * @Description: 标签页组件入口
 * @FilePath: /simple-ui/packages/tab/index.ts
 */
import Tab from "./src/tab.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STab", Tab);
  },
};

type TabInstance = InstanceType<typeof Tab>;

export default plugin;
export { Tab, TabInstance };
