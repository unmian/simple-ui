/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:31:32
 * @LastEditTime: 2022-04-11 12:31:31
 * @LastEditors: Quarter
 * @Description: 下拉框类型
 * @FilePath: /simple-ui/packages/select/src/types/index.ts
 */
import { Identifier } from "packages/types";

// 下拉框的值
export type SelectValue = number | string | null;

// 下拉框选项配置
export interface OptionConfig {
  id: Identifier; // 唯一识别符
  label: string | null; // 选项文字
  value: SelectValue; // 选项值
  checked?: boolean; // 是否选中
}

export interface OptionConfigs {
  [key: string]: OptionConfig; // 选项配置
}
