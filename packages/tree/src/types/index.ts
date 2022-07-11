/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:46:20
 * @LastEditTime: 2022-04-11 12:35:08
 * @LastEditors: Quarter
 * @Description: 树型组件类型
 * @FilePath: /simple-ui/packages/tree/src/types/index.ts
 */
import { Identifier } from "packages/types";

// 树参数配置
export interface TreeProp {
  id?: string; // 唯一识别符
  label?: string; // 标签属性
  children?: string; // 子节点属性
  isLeaf?: string; // 是否叶子属性
}

// 树结构
export interface TreeNodeConfig {
  id: Identifier; // 唯一识别码
  parentId: Identifier | null; // 父级唯一识别码
  sequence: Identifier[]; // 序列
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
export type TreeLazyLoad = (node: TreeNodeConfig, resolve: (nodes: any[]) => void) => void;

// 选中的节点
export interface TreeCheckedNode {
  [nodeId: number]: TreeNodeConfig;
  [nodeId: string]: TreeNodeConfig;
}