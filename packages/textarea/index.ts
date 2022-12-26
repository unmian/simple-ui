/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:35:18
 * @LastEditTime: 2022-12-14 09:04:23
 * @LastEditors: Quarter
 * @Description: 文本域组件入口
 * @FilePath: /simple-ui/packages/textarea/index.ts
 */
import Textarea from "./src/textarea.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STextarea", Textarea);
  },
};

type TextareaInstance = InstanceType<typeof Textarea>;

export default plugin;
export { Textarea, TextareaInstance };
