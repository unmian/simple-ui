/*
 * @Author: Quarter
 * @Date: 2022-04-08 01:33:56
 * @LastEditTime: 2022-12-14 09:07:45
 * @LastEditors: Quarter
 * @Description: 提示组件入口
 * @FilePath: /simple-ui/packages/tip/index.ts
 */
import Tip from "./src/tip.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STip", Tip);
  },
};

type TipInstance = InstanceType<typeof Tip>;

export default plugin;
export { Tip, TipInstance };
