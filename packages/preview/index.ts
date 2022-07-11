/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:16:48
 * @LastEditTime: 2022-06-10 11:13:51
 * @LastEditors: Quarter
 * @Description: 预览组件入口
 * @FilePath: /simple-ui/packages/preview/index.ts
 */
import Preview from "./src/preview.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPreview", Preview);
  },
} as PluginObject<any>;

export { Preview };
