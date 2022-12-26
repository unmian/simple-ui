/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:48:35
 * @LastEditTime: 2022-09-19 16:32:12
 * @LastEditors: Quarter
 * @Description: 全局提示组件类型
 * @FilePath: /simple-ui/packages/message/src/types.ts
 */
import { CommonType } from "packages/types";

// 提示配置项
export interface MessageOptions {
  theme?: CommonType; // 类型
  message?: string; // 消息
  duration?: number; // 自动关闭时间
  onClose?: () => void; // 关闭回调
}

// 提示方法
export type MessageCommand = ((message: string | MessageOptions) => string) &
  ((options: MessageOptions) => string) & {
    info: (message: string) => string;
    success: (message: string) => string;
    warning: (message: string) => string;
    error: (message: string) => string;
  } & {
    info: (options: string) => string;
    success: (options: string) => string;
    warning: (options: string) => string;
    error: (options: string) => string;
  };
