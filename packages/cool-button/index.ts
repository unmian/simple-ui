/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:47:52
 * @LastEditors: Quarter
 * @Description: 冷却按钮组件入口
 * @FilePath: /simple-ui/packages/cool-button/index.ts
 */
import CoolButton from "./src/cool-button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SCoolButton", CoolButton);
  },
};

type CoolButtonInstance = InstanceType<typeof CoolButton>;

export default plugin;
export { CoolButton, CoolButtonInstance };
