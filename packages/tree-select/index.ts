/*
 * @Author: Quarter
 * @Date: 2022-04-08 03:34:03
 * @LastEditTime: 2022-12-14 09:10:13
 * @LastEditors: Quarter
 * @Description: 树型下拉框组件入口
 * @FilePath: /simple-ui/packages/tree-select/index.ts
 */
import TreeSelect from "./src/tree-select.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STreeSelect", TreeSelect);
  },
};

type TreeSelectInstance = InstanceType<typeof TreeSelect>;

export default plugin;
export * from "./src/types";
export { TreeSelect, TreeSelectInstance };
