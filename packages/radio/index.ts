/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:58:28
 * @LastEditTime: 2022-12-14 08:58:03
 * @LastEditors: Quarter
 * @Description: 单选按钮组件入口
 * @FilePath: /simple-ui/packages/radio/index.ts
 */
import Radio from "./src/radio.vue";
import RadioButton from "./src/radio-button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SRadio", Radio);
    vue.component("SRadioButton", RadioButton);
  },
};

type RadioInstance = InstanceType<typeof Radio>;
type RadioButtonInstance = InstanceType<typeof RadioButton>;

export default plugin;
export * from "./src/types";
export { Radio, RadioInstance, RadioButton, RadioButtonInstance };
