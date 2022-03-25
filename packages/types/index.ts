/*
 * @Author: Quarter
 * @Date: 2020-08-27 20:22:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 00:58:45
 * @Description: ui组件类名
 */
import SimpleMessageBox from "./components/SimpleMessageBox.vue";

// 位置
export type SimplePosition = "top" | "left" | "bottom" | "right";

// 交互
export type SimpleAction = "click" | "hover";

// 排列
export type SimpleAlign = "left" | "right" | "center" | "spaceBetween" | "spaceAround";

// 方向
export type SimpleDirection = "horizontal" | "vertical";

// 尺寸
export type SimpleSize = "mini" | "small" | "medium" | "large";

// 类型
export type SimpleType = "info" | "warning" | "success" | "error";

// 按钮类型
export type SimpleButtonType = "cancel" | "confirm" | "normal" | "success" | "warning" | "danger" | "linear";

// 列表形式
export type SimpleListMode = "list" | "card";

// 标记形式
export type SimpleMarkMode = "dot" | "number";

// 颜色模式
export type SimpleThemeMode = "dark" | "light";

// 唯一识别码
export type SimpleIdentifier = number | string;

// 标签值
export type SimpleTagValue = number | string | null;

// 路径
export type SimpleFileSource = string | null;

// 分页按钮
export type SimplePageValue = string | number;

// 单选框值
export type SimpleRadioValue = string | boolean | number | null;

// 复选框的值
export type SimpleCheckboxValue = string | number | null;

// 下拉框的值
export type SimpleSelectValue = number | string | null;

// 输入框的值
export type SimpleInputValue = string | number | null | undefined;

// 表单的值
export type SimpleFormItemValue = SimpleRadioValue | SimpleRadioValue[] | undefined;

// 文件选择的值
export type SimpleFileValue = File[] | File | null;

// 过渡方式
export type SimpleTransitionType = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "revert";

// 表单数据
export interface SimpleFormData {
  [key: string]: SimpleFormItemValue;
}

// 错误数据仓库
export interface SimpleErrorDepot {
  [type: string]: string;
}

// 通用数据类型
export interface SimpleCommonData {
  id?: string | number; // 识别号
  name: string; // 数据名称
  icon?: string | null; // 数据图标
  activeIcon?: string; // 激活的数据图标
  value?: number | undefined | null; // 数据值
  unit?: string; // 数据单位
  children?: SimpleCommonData[]; // 子内容
}

// 菜单配置项
export interface SimpleMenuItem extends SimpleCommonData {
  path?: string; // 菜单对应路径
  pathName?: string; // 菜单路径名称
  hidden?: boolean; // 是否隐藏
  onActive?: () => void; // 菜单激活回调
  children?: SimpleMenuItem[]; // 子内容
}

// 自定义样式表
export interface SimpleCustomStyle {
  [styleName: string]: number | string | undefined;
}

// 自定义类
export interface SimpleCustomClass {
  [className: string]: boolean;
}

// 阶段项
export interface SimpleStepItem {
  name: string; // 名称
  brief?: string; // 说明
}

// 验证触发方式
export type SimpleValidateTrigger = "change" | "blur" | "focus";

// 表单数据类型
export type SimpleValidateType = "number" | "boolean";

// 表单规则
export interface SimpleFormRule {
  trigger: SimpleValidateTrigger; // 触发方式
  required?: boolean; // 是否必须
  type?: SimpleValidateType; // 类型
  reg?: RegExp; // 正则
  validate?: (value: SimpleFormItemValue, data: SimpleFormData) => void; // 验证函数
  message?: string; // 错误信息
}

// 表单规则集合
export interface SimpleFormRules {
  [key: string]: SimpleFormRule[];
}

// 表单验证结果
export interface SimpleFormValidate {
  status: boolean; // 是否为错
  message: string | undefined; // 是否有消息
}

// 树参数配置
export interface SimpleTreeProp {
  id?: string; // 唯一识别符
  label?: string; // 标签属性
  children?: string; // 子节点属性
  isLeaf?: string; // 是否叶子属性
}

// 树结构
export interface SimpleNodeConfig {
  id: SimpleIdentifier; // 唯一识别码
  parentId: SimpleIdentifier | null; // 父级唯一识别码
  sequence: SimpleIdentifier[]; // 序列
  position: number[]; // 位置
  label: string; // 节点文本
  level: number; // 层级
  isLeaf?: boolean; // 是否叶子节点
  // checked: boolean; // 是否勾选
  selected?: boolean; // 是否选中
  expand?: boolean; // 是否展开
  loading?: boolean; // 正在加载
  data: any; // 数据
}

// 懒加载函数
export type SimpleLazyLoad = (node: SimpleNodeConfig, resolve: (nodes: any[]) => void) => void;

// 树形下拉框节点
export interface SimpleSelectNodeConfig {
  id: SimpleIdentifier; // 识别码
  label: string; // 名称
  children?: SimpleSelectNodeConfig[]; // 子节点
}

// 选中的节点
export interface SimpleCheckedNode {
  [nodeId: number]: SimpleNodeConfig;
  [nodeId: string]: SimpleNodeConfig;
}

export interface SimpleMessageOptions {
  type?: SimpleType; // 类型
  message?: string; // 消息
  duration?: number; // 自动关闭时间
  onClose?: () => void; // 关闭回调
}

export interface SimpleMessageComponent {
  close: () => void;
}

export interface SimpleMessageCommand {
  (message: string): SimpleMessageBox;
  (options: SimpleMessageOptions): SimpleMessageBox;
  info (message: string): SimpleMessageBox;
  info (options: string): SimpleMessageBox;
  success (message: string): SimpleMessageBox;
  success (options: string): SimpleMessageBox;
  warning (message: string): SimpleMessageBox;
  warning (options: string): SimpleMessageBox;
  error (message: string): SimpleMessageBox;
  error (options: string): SimpleMessageBox;
}

export interface SimpleDayConfig {
  time: number;
  date: number;
  enable: boolean;
  select?: boolean;
}

export interface SimpleTimeConfig {
  hour: number | null;
  minute: number | null;
  second: number | null;
}

export interface SimpleDateTimeConfig {
  date: Date;
  hour: number | null;
  minute: number | null;
  second: number | null;
}

export interface SimpleOptionConfig {
  id: SimpleIdentifier; // 唯一识别符
  label: string | null; // 选项文字
  value: SimpleSelectValue; // 选项值
  checked?: boolean; // 是否选中
}

export interface SimpleOptionConfigs {
  [key: string]: SimpleOptionConfig; // 选项配置
}

export interface AnimationIndex {
  [key: string]: number | undefined; // 索引
}