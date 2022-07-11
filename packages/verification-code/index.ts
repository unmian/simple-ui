/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:54:35
 * @LastEditTime: 2022-04-11 12:36:01
 * @LastEditors: Quarter
 * @Description: 图形验证码组件入口
 * @FilePath: /simple-ui/packages/verification-code/index.ts
 */
import VerificationCode from "./src/verification-code.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SVerificationCode", VerificationCode);
  },
} as PluginObject<any>;

export {
  VerificationCode,
};