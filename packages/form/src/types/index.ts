/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:34:49
 * @LastEditTime: 2022-04-11 12:25:53
 * @LastEditors: Quarter
 * @Description: 表单组件类型
 * @FilePath: /simple-ui/packages/form/src/types/index.ts
 */
// 表单的值
export type FormItemValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | null
  | undefined;

// 表单数据
export interface CustomFormData {
  [key: string]: FormItemValue;
}

// 错误数据仓库
export interface FormErrorDepot {
  [type: string]: string;
}

// 验证触发方式
export type ValidateTrigger = "change" | "blur" | "focus";

// 表单数据类型
export type ValidateType = "number" | "boolean";

// 表单规则
export interface FormRule {
  trigger: ValidateTrigger; // 触发方式
  required?: boolean; // 是否必须
  type?: ValidateType; // 类型
  reg?: RegExp; // 正则
  validate?: (value: FormItemValue, data: CustomFormData) => void; // 验证函数
  message?: string; // 错误信息
}

// 表单规则集合
export interface FormRules {
  [key: string]: FormRule[];
}

// 表单验证结果
export interface FormValidate {
  status: boolean; // 是否为错
  message: string | undefined; // 是否有消息
}
