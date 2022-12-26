/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:51:43
 * @LastEditTime: 2022-12-14 09:09:39
 * @LastEditors: Quarter
 * @Description: 树型组件入口
 * @FilePath: /simple-ui/packages/tree/index.ts
 */
import Tree from "./src/tree.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STree", Tree);
  },
};

type TreeInstance = InstanceType<typeof Tree>;

export default plugin;
export * from "./src/types";
export { Tree, TreeInstance };
