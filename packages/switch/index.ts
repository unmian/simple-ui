/*
 * @Author: Quarter
 * @Date: 2022-04-08 03:22:27
 * @LastEditTime: 2022-12-14 09:00:44
 * @LastEditors: Quarter
 * @Description: 切换按钮组件入口
 * @FilePath: /simple-ui/packages/switch/index.ts
 */
import Switch from "./src/switch.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SSwitch", Switch);
  },
};

type SwitchInstance = InstanceType<typeof Switch>;

export default plugin;
export { Switch, SwitchInstance };
