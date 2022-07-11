/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-06-10 11:13:56
 * @LastEditors: Quarter
 * @Description: 标签组件入口
 * @FilePath: /simple-ui/packages/tag/index.ts
 */
import STag from "./src/tag.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STag", STag);
  },
} as PluginObject<any>;

export { STag };
