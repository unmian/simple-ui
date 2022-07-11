/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:45:00
 * @LastEditTime: 2022-06-10 11:13:31
 * @LastEditors: Quarter
 * @Description: 文件选择按钮
 * @FilePath: /simple-ui/packages/file-button/index.ts
 */
import FileButton from "./src/file-button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SFileButton", FileButton);
  },
} as PluginObject<any>;

export { FileButton };
