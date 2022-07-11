/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:41:04
 * @LastEditTime: 2022-06-10 11:13:37
 * @LastEditors: Quarter
 * @Description: 图片选择器组件入口
 * @FilePath: /simple-ui/packages/image-picker/index.ts
 */
import ImagePicker from "./src/image-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SImagePicker", ImagePicker);
  },
} as PluginObject<any>;

export { ImagePicker };
