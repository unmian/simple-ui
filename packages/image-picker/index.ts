/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:41:04
 * @LastEditTime: 2022-12-14 08:52:54
 * @LastEditors: Quarter
 * @Description: 图片选择器组件入口
 * @FilePath: /simple-ui/packages/image-picker/index.ts
 */
import ImagePicker from "./src/image-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SImagePicker", ImagePicker);
  },
};

type ImagePickerInstance = InstanceType<typeof ImagePicker>;

export default plugin;
export { ImagePicker, ImagePickerInstance };
