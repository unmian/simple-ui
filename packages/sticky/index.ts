/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:12:23
 * @LastEditTime: 2022-12-14 09:00:21
 * @LastEditors: Quarter
 * @Description: 吸附组件入口
 * @FilePath: /simple-ui/packages/sticky/index.ts
 */
import Sticky from "./src/sticky.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SSticky", Sticky);
  },
};

type StickyInstance = InstanceType<typeof Sticky>;

export default plugin;
export { Sticky, StickyInstance };
