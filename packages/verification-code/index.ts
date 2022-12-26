/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:54:35
 * @LastEditTime: 2022-12-14 09:10:44
 * @LastEditors: Quarter
 * @Description: 图形验证码组件入口
 * @FilePath: /simple-ui/packages/verification-code/index.ts
 */
import VerificationCode from "./src/verification-code.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SVerificationCode", VerificationCode);
  },
};

type VerificationCodeInstance = InstanceType<typeof VerificationCode>;

export default plugin;
export { VerificationCode, VerificationCodeInstance };
