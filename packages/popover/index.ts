/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:57:08
 * @LastEditors: Quarter
 * @Description: 冷却按钮组件入口
 * @FilePath: /simple-ui/packages/popover/index.ts
 */
import Popover from "./src/popover.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPopover", Popover);
  },
};

type PopoverInstance = InstanceType<typeof Popover>;

export default plugin;
export { Popover, PopoverInstance };
