/*
 * @Author: Quarter
 * @Date: 2021-03-16 17:32:36
 * @LastEditTime: 2022-04-11 12:28:35
 * @LastEditors: Quarter
 * @Description: 显示消息
 * @FilePath: /simple-ui/packages/message/src/function/message.ts
 */
import { UUID } from "packages/util";
import { CommonType } from "packages/types";
import MessageBox from "../message-box.vue";
import { MessageCommand, MessageOptions } from "../types";

// 保留上一个实例
const instances: any = {};

// 显示消息
const showMessage = (options: MessageOptions): InstanceType<typeof MessageBox> => {
  if (Object.values(instances).length > 0) {
    Object.values(instances).forEach((instance: any) => {
      if (instance instanceof MessageBox) {
        instance.close();
        // eslint-disable-next-line no-param-reassign
        instance = undefined;
      }
    });
  }
  const { type, message, duration, onClose } = options;
  const uuid: string = UUID();
  const SMessage: InstanceType<typeof MessageBox> = new MessageBox({
    props: {
      uuid: {
        default: uuid,
      },
      messageType: {
        default: type || "info",
      },
      message: {
        default: message || "",
      },
      duration: {
        default: duration,
      },
      onClose: {
        default: onClose,
      },
    },
  });
  SMessage.$mount();
  document.body.appendChild(SMessage.$el);
  SMessage.$on("close", (id: string) => {
    delete instances[id];
  });
  instances[uuid] = SMessage;
  return SMessage;
};

// 弹窗类型
const types: CommonType[] = ["info", "success", "warning", "error"];

// 绑定弹窗函数
const Message: any = (
  options?: string | MessageOptions,
): InstanceType<typeof MessageBox> | undefined => {
  if (typeof options === "string") {
    const SMessage: InstanceType<typeof MessageBox> = showMessage({
      message: options,
    });
    return SMessage;
  } else if (typeof options === "object") {
    const SMessage: InstanceType<typeof MessageBox> = showMessage(options);
    return SMessage;
  } 
    const SMessage: InstanceType<typeof MessageBox> = showMessage({});
    return SMessage;
  
};

types.forEach((type: CommonType) => {
  Message[type] = (options: any): InstanceType<typeof MessageBox> => {
    if (typeof options === "string") {
      return Message({
        type,
        message: options,
      });
    } else if (typeof options === "object") {
      // eslint-disable-next-line no-param-reassign
      options.type = type;
      return Message(options);
    } 
      return Message();
    
  };
});

export default Message as MessageCommand;
