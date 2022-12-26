/*
 * @Author: Quarter
 * @Date: 2022-04-08 03:29:40
 * @LastEditTime: 2022-12-14 08:59:12
 * @LastEditors: Quarter
 * @Description: 下拉框组件入口
 * @FilePath: /simple-ui/packages/select/index.ts
 */
import Select from "./src/select.vue";
import Option from "./src/option.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SSelect", Select);
    vue.component("SOption", Option);
  },
};

type SelectInstance = InstanceType<typeof Select>;
type OptionInstance = InstanceType<typeof Option>;

export default plugin;
export * from "./src/types";
export { Select, SelectInstance, Option, OptionInstance };
