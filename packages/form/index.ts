/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:01:58
 * @LastEditTime: 2022-04-11 12:26:09
 * @LastEditors: Quarter
 * @Description: 表单组件入口
 * @FilePath: /simple-ui/packages/form/index.ts
 */
import Form from "./src/form.vue";
import FormItem from "./src/form-item.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SForm", Form);
    vue.component("SFormItem", FormItem);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  Form,
  FormItem,
};