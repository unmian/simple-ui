/*
 * @Author: Quarter
 * @Date: 2022-04-11 12:05:18
 * @LastEditTime: 2022-04-11 12:35:41
 * @LastEditors: Quarter
 * @Description: 树型下拉框组件类型
 * @FilePath: /simple-ui/packages/tree-select/src/types/index.ts
 */
import { Identifier } from "packages/types";

// 树形下拉框节点
export interface SelectNodeConfig {
  id: Identifier; // 识别码
  label: string; // 名称
  children?: SelectNodeConfig[]; // 子节点
}