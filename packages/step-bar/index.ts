/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:04:07
 * @LastEditTime: 2022-04-11 12:32:38
 * @LastEditors: Quarter
 * @Description: 步骤组件入口
 * @FilePath: /simple-ui/packages/step-bar/index.ts
 */
import StepBar from "./src/step-bar.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SStepBar", StepBar);
  },
} as PluginObject<any>;

export * from "./src/types";
export {
  StepBar,
};