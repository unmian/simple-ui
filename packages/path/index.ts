/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:56:26
 * @LastEditors: Quarter
 * @Description: 描述组件入口
 * @FilePath: /simple-ui/packages/path/index.ts
 */
import Path from "./src/path.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPath", Path);
  },
};

type PathInstance = InstanceType<typeof Path>;

export default plugin;
export * from "./src/types";
export { Path, PathInstance };
