/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:53:19
 * @LastEditors: Quarter
 * @Description: 输入框组件入口
 * @FilePath: /simple-ui/packages/input/index.ts
 */
import Input from "./src/input.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SInput", Input);
  },
};

type InputInstance = InstanceType<typeof Input>;

export default plugin;
export * from "./src/types";
export { Input, InputInstance };
