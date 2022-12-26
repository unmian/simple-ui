/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:04:07
 * @LastEditTime: 2022-12-14 08:59:58
 * @LastEditors: Quarter
 * @Description: 步骤组件入口
 * @FilePath: /simple-ui/packages/step-bar/index.ts
 */
import StepBar from "./src/step-bar.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SStepBar", StepBar);
  },
};

type StepBarInstance = InstanceType<typeof StepBar>;

export default plugin;
export * from "./src/types";
export { StepBar, StepBarInstance };
