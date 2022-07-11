/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:07:38
 * @LastEditTime: 2022-06-10 11:13:27
 * @LastEditors: Quarter
 * @Description: 弹窗组件入口
 * @FilePath: /simple-ui/packages/dialog/index.ts
 */
import Dialog from "./src/dialog.vue";
import DialogBox from "./src/dialog-box.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SDialog", Dialog);
    vue.component("SDialogBox", DialogBox);
  },
} as PluginObject<any>;

export { Dialog, DialogBox };
