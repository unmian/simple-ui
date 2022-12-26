/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:47:18
 * @LastEditors: Quarter
 * @Description: 复选框组件入口
 * @FilePath: /simple-ui/packages/checkbox/index.ts
 */
import Checkbox from "./src/checkbox.vue";
import CheckboxButton from "./src/checkbox-button.vue";
import CheckboxGroup from "./src/checkbox-group.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SCheckbox", Checkbox);
    vue.component("SCheckboxButton", CheckboxButton);
    vue.component("SCheckboxGroup", CheckboxGroup);
  },
};

type CheckboxInstance = InstanceType<typeof Checkbox>;
type CheckboxButtonInstance = InstanceType<typeof CheckboxButton>;
type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>;

export default plugin;
export * from "./src/types";
export {
  Checkbox,
  CheckboxInstance,
  CheckboxButton,
  CheckboxButtonInstance,
  CheckboxGroup,
  CheckboxGroupInstance,
};
