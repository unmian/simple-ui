/*
 * @Author: Quarter
 * @Date: 2021-03-16 17:32:36
 * @LastEditTime: 2022-03-24 15:24:21
 * @LastEditors: Quarter
 * @Description: 显示消息
 * @FilePath: /simple-ui/packages/functions/message.ts
 */
import { SimpleMessageOptions, SimpleType } from "../types";
import { generateUUID } from "../expand/tool";
import SimpleMessageBox from "../components/SimpleMessageBox.vue";

// 保留上一个实例
const instances: any = {};

// 显示消息
const showMessage = (options: SimpleMessageOptions): InstanceType<typeof SimpleMessageBox> => {
  if (Object.values(instances).length > 0) {
    Object.values(instances).forEach((instance: any) => {
      if (instance instanceof SimpleMessageBox) {
        instance.close();
        instance = undefined;
      }
    });
  }
  const { type, message, duration, onClose } = options;
  const uuid: string = generateUUID();
  const simpleMessage: InstanceType<typeof SimpleMessageBox> = new SimpleMessageBox({
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
  simpleMessage.$mount();
  document.body.appendChild(simpleMessage.$el);
  simpleMessage.$on("close", (id: string) => {
    delete instances[uuid];
  });
  instances[uuid] = simpleMessage;
  return simpleMessage;
};

// 弹窗类型
const types: SimpleType[] = ["info", "success", "warning", "error"];

// 绑定弹窗函数
const Message: any = (options?: string | SimpleMessageOptions): InstanceType<typeof SimpleMessageBox> | undefined => {
  if (typeof options === "string") {
    const simpleMessage: InstanceType<typeof SimpleMessageBox> = showMessage({
      message: options,
    });
    return simpleMessage;
  } else if (typeof options === "object") {
    const simpleMessage: InstanceType<typeof SimpleMessageBox> = showMessage(options);
    return simpleMessage;
  } else {
    const simpleMessage: InstanceType<typeof SimpleMessageBox> = showMessage({});
    return simpleMessage;
  }
};

types.forEach((type: SimpleType) => {
  Message[type] = (options: any): InstanceType<typeof SimpleMessageBox> => {
    if (typeof options === "string") {
      return Message({
        type,
        message: options,
      });
    } else if (typeof options === "object") {
      options.type = type;
      return Message(options);
    } else {
      return Message();
    }
  };
});

export default Message;