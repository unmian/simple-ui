/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:58:28
 * @LastEditTime: 2022-04-11 12:31:06
 * @LastEditors: Quarter
 * @Description: 单选按钮组件入口
 * @FilePath: /simple-ui/packages/radio/index.ts
 */
import Radio from "./src/radio.vue";
import RadioButton from "./src/radio-button.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SRadio", Radio);
    vue.component("SRadioButton", RadioButton);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  Radio,
  RadioButton,
};