/*
 * @Author: Quarter
 * @Date: 2022-04-08 05:48:24
 * @LastEditTime: 2022-12-14 08:55:25
 * @LastEditors: Quarter
 * @Description: 密码强度组件入口
 * @FilePath: /simple-ui/packages/password-strength/index.ts
 */
import PasswordStrength from "./src/password-strength.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPasswordStrength", PasswordStrength);
  },
};

type PasswordStrengthInstance = InstanceType<typeof PasswordStrength>;

export default plugin;
export { PasswordStrength, PasswordStrengthInstance };
