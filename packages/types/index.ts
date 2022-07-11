/*
 * @Author: Quarter
 * @Date: 2020-08-27 20:22:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-07 19:15:08
 * @Description: ui组件类名
 */
import { MessageCommand } from "packages/message";

declare module "vue/types/vue" {
  interface Vue {
    $message: MessageCommand;
  }

  interface VueConstructor {
    $message: MessageCommand;
  }
}

// 位置
export type CommonPosition = "top" | "left" | "bottom" | "right";

// 交互
export type CommonAction = "click" | "hover";

// 排列
export type CommonAlign = "left" | "right" | "center" | "spaceBetween" | "spaceAround";

// 方向
export type CommonDirection = "horizontal" | "vertical";

// 尺寸
export type CommonSize = "mini" | "small" | "medium" | "large";

// 类型
export type CommonType = "info" | "warning" | "success" | "error";

// 颜色模式
export type CommonThemeMode = "dark" | "light";

// 唯一识别码
export type Identifier = number | string;

// 路径
export type FileSource = string | null;

// 文件选择的值
export type FileValue = File[] | File | null;

// 通用数据类型
export interface CommonData {
  id?: string | number; // 识别号
  name: string; // 数据名称
  icon?: string | null; // 数据图标
  activeIcon?: string; // 激活的数据图标
  value?: number | undefined | null; // 数据值
  unit?: string; // 数据单位
  children?: CommonData[]; // 子内容
}

// 自定义样式表
export interface CustomStyle {
  [styleName: string]: number | string | undefined;
}

// 自定义类
export type CustomClass = {
  [className: string]: boolean | undefined;
} | string[];

export interface AnimationIndex {
  [key: string]: number | undefined; // 索引
}
