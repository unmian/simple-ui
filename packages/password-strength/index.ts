/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:48:24
 * @LastEditTime: 2022-04-11 12:29:41
 * @LastEditors: Quarter
 * @Description: 密码强度组件入口
 * @FilePath: /simple-ui/packages/password-strength/index.ts
 */
import PasswordStrength from "./src/password-strength.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPasswordStrength", PasswordStrength);
  },
} as PluginObject<any>;

export {
  PasswordStrength,
};