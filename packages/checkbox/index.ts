/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-06-10 11:13:18
 * @LastEditors: Quarter
 * @Description: 复选框组件入口
 * @FilePath: /simple-ui/packages/checkbox/index.ts
 */
import Checkbox from "./src/checkbox.vue";
import CheckboxButton from "./src/checkbox-button.vue";
import CheckboxGroup from "./src/checkbox-group.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SCheckbox", Checkbox);
    vue.component("SCheckboxButton", CheckboxButton);
    vue.component("SCheckboxGroup", CheckboxGroup);
  },
} as PluginObject<any>;

export * from "./src/types";
export { Checkbox, CheckboxButton, CheckboxGroup };
