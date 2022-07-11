/*
 * @Author: Quarter
 * @Date: 2022-04-08 01:47:12
 * @LastEditTime: 2022-06-10 11:12:47
 * @LastEditors: Quarter
 * @Description: 全局消息组件入口
 * @FilePath: /simple-ui/packages/alert/index.ts
 */
import Message from "./src/message.vue";
import MessageFunc from "./src/function/message";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SMessage", Message);

    vue.$message = MessageFunc;
    Object.defineProperties(vue.prototype, {
      $message: {
        get() {
          return MessageFunc;
        },
      },
    });
  },
} as PluginObject<any>;

export * from "./src/types";
export { Message, MessageFunc };
