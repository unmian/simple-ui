/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:01:58
 * @LastEditTime: 2022-12-14 08:51:51
 * @LastEditors: Quarter
 * @Description: 表单组件入口
 * @FilePath: /simple-ui/packages/form/index.ts
 */
import Form from "./src/form.vue";
import FormItem from "./src/form-item.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SForm", Form);
    vue.component("SFormItem", FormItem);
  },
};

type FormInstance = InstanceType<typeof Form>;
type FormItemInstance = InstanceType<typeof FormItem>;

export default plugin;
export * from "./src/types";
export { Form, FormInstance, FormItem, FormItemInstance };
