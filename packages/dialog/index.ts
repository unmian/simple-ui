/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:07:38
 * @LastEditTime: 2022-12-14 08:50:35
 * @LastEditors: Quarter
 * @Description: 弹窗组件入口
 * @FilePath: /simple-ui/packages/dialog/index.ts
 */
import Dialog from "./src/dialog.vue";
import DialogBox from "./src/dialog-box.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SDialog", Dialog);
    vue.component("SDialogBox", DialogBox);
  },
};

type DialogInstance = InstanceType<typeof Dialog>;
type DialogBoxInstance = InstanceType<typeof DialogBox>;

export default plugin;
export { Dialog, DialogInstance, DialogBox, DialogBoxInstance };
