/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:58:29
 * @LastEditors: Quarter
 * @Description: 滚动条组件入口
 * @FilePath: /simple-ui/packages/scroll/index.ts
 */
import Scroll from "./src/scroll.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SScroll", Scroll);
  },
};

type ScrollInstance = InstanceType<typeof Scroll>;

export default plugin;
export { Scroll, ScrollInstance };
