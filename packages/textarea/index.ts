/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:35:18
 * @LastEditTime: 2022-04-11 12:33:58
 * @LastEditors: Quarter
 * @Description: 文本域组件入口
 * @FilePath: /simple-ui/packages/textarea/index.ts
 */
import Textarea from "./src/textarea.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STextarea", Textarea);
  },
} as PluginObject<any>;

export {
  Textarea,
};