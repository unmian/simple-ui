/*
 * @Author: Quarter
 * @Date: 2022-04-08 03:22:27
 * @LastEditTime: 2022-04-11 12:33:00
 * @LastEditors: Quarter
 * @Description: 切换按钮组件入口
 * @FilePath: /simple-ui/packages/switch/index.ts
 */
import Switch from "./src/switch.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SSwitch", Switch);
  },
} as PluginObject<any>;

export {
  Switch,
};