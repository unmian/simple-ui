/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:14:42
 * @LastEditTime: 2022-12-14 08:52:12
 * @LastEditors: Quarter
 * @Description: 图片容器组件入口
 * @FilePath: /simple-ui/packages/image/index.ts
 */
import Image from "./src/image.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SImage", Image);
  },
};

type ImageInstance = InstanceType<typeof Image>;

export default plugin;
export { Image, ImageInstance };
