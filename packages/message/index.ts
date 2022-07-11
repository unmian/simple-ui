/*
 * @Author: Quarter
 * @Date: 2022-04-08 01:47:12
 * @LastEditTime: 2022-06-10 11:13:46
 * @LastEditors: Quarter
 * @Description: 全局消息组件入口
 * @FilePath: /simple-ui/packages/message/index.ts
 */
import Message from "./src/function/message";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.$message = Message;
    Object.defineProperties(vue.prototype, {
      $message: {
        get() {
          return Message;
        },
      },
    });
  },
} as PluginObject<any>;

export * from "./src/types";
export { Message };
