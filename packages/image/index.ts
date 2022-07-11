/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:14:42
 * @LastEditTime: 2022-06-10 11:13:34
 * @LastEditors: Quarter
 * @Description: 图片容器组件入口
 * @FilePath: /simple-ui/packages/image/index.ts
 */
import Image from "./src/image.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SImage", Image);
  },
} as PluginObject<any>;

export { Image };
