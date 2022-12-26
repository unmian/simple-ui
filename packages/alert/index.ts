/*
 * @Author: Quarter
 * @Date: 2022-04-08 01:47:12
 * @LastEditTime: 2022-12-14 08:41:54
 * @LastEditors: Quarter
 * @Description: 全局消息组件入口
 * @FilePath: /simple-ui/packages/alert/index.ts
 */
import Message from "./src/message.vue";
import MessageFunc from "./src/function/message";

type MessageInstance = InstanceType<typeof Message>;

export * from "./src/types";
export { Message, MessageFunc, MessageInstance };
