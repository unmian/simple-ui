/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:16:48
 * @LastEditTime: 2022-12-14 08:57:27
 * @LastEditors: Quarter
 * @Description: 预览组件入口
 * @FilePath: /simple-ui/packages/preview/index.ts
 */
import Preview from "./src/preview.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPreview", Preview);
  },
};

type PreviewInstance = InstanceType<typeof Preview>;

export default plugin;
export { Preview, PreviewInstance };
