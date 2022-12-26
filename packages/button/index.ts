/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:01:59
 * @LastEditTime: 2022-12-14 08:46:11
 * @LastEditors: Quarter
 * @Description: 按钮组件入口
 * @FilePath: /simple-ui/packages/button/index.ts
 */
import Button from "./src/button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SButton", Button);
  },
};

type ButtonInstance = InstanceType<typeof Button>;

export default plugin;

export * from "./src/types";
export { Button, ButtonInstance };
