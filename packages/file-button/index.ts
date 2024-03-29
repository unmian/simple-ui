/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:45:00
 * @LastEditTime: 2022-12-14 08:51:05
 * @LastEditors: Quarter
 * @Description: 文件选择按钮
 * @FilePath: /simple-ui/packages/file-button/index.ts
 */
import FileButton from "./src/file-button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SFileButton", FileButton);
  },
};

type FileButtonInstance = InstanceType<typeof FileButton>;

export default plugin;
export { FileButton, FileButtonInstance };
