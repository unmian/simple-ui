/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:48:35
 * @LastEditTime: 2022-04-11 11:48:36
 * @LastEditors: Quarter
 * @Description: 全局提示组件类型
 * @FilePath: /simple-ui/packages/message/src/types/index.ts
 */
import { CommonType } from "packages/types";
import MessageBox from "../message-box.vue";

// 提示配置项
export interface MessageOptions {
  type?: CommonType; // 类型
  message?: string; // 消息
  duration?: number; // 自动关闭时间
  onClose?: () => void; // 关闭回调
}

// 提示方法
export interface MessageCommand {
  (message: string): MessageBox;
  (options: MessageOptions): MessageBox;
  info (message: string): MessageBox;
  info (options: string): MessageBox;
  success (message: string): MessageBox;
  success (options: string): MessageBox;
  warning (message: string): MessageBox;
  warning (options: string): MessageBox;
  error (message: string): MessageBox;
  error (options: string): MessageBox;
}