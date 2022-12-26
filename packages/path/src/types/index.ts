/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:41:25
 * @LastEditTime: 2022-04-11 12:30:08
 * @LastEditors: Quarter
 * @Description: 路径组件类型
 * @FilePath: /simple-ui/packages/path/src/types/index.ts
 */
import { CommonData } from "packages/types";

// 菜单配置项
export interface MenuItem extends CommonData {
  path?: string; // 菜单对应路径
  pathName?: string; // 菜单路径名称
  hidden?: boolean; // 是否隐藏
  onActive?: () => void; // 菜单激活回调
  children?: MenuItem[]; // 子内容
}
