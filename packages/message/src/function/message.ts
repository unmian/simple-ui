/*
 * @Author: Quarter
 * @Date: 2021-03-16 17:32:36
 * @LastEditTime: 2022-12-13 16:08:55
 * @LastEditors: Quarter
 * @Description: 显示消息
 * @FilePath: /simple-ui/packages/message/src/function/message.ts
 */
import { UUID } from "packages/util";
import { CommonType } from "packages/types";
import MessageBox from "../message-box.vue";
import { MessageCommand, MessageOptions } from "../types";

// 保留上一个实例
let instances: { [uuid: string]: InstanceType<typeof MessageBox> } = {};

// 显示消息
const showMessage = (options: MessageOptions): string => {
  if (Object.values(instances).length > 0) {
    Object.values(instances).forEach((instance) => {
      if (instance instanceof MessageBox) {
        instance.close();
      }
    });
    instances = {};
  }
  const { theme, message, duration, onClose } = options;
  const uuid: string = UUID();
  const SMessage = new MessageBox({
    props: {
      uuid: {
        default: uuid,
      },
      messageType: {
        default: theme || "info",
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
  return uuid;
};

// 绑定弹窗函数
const Message: any = (options?: string | MessageOptions): string => {
  if (typeof options === "string") {
    return showMessage({
      message: options,
    });
  } else if (typeof options === "object") {
    return showMessage(options);
  }
  return showMessage({});
};

// 弹窗类型
const themes: CommonType[] = ["info", "success", "warning", "error"];
themes.forEach((theme: CommonType) => {
  Message[theme] = (options: string | MessageOptions): InstanceType<typeof MessageBox> => {
    if (typeof options === "string") {
      return Message({
        theme,
        message: options,
      });
    } else if (typeof options === "object") {
      return Message({ ...options, theme });
    }
    return Message();
  };
});

export default Message as MessageCommand;
