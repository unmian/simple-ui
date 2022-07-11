/*
 * @Author: Quarter
 * @Date: 2022-04-11 11:52:51
 * @LastEditTime: 2022-04-11 12:23:28
 * @LastEditors: Quarter
 * @Description: 日期时间选择器类型
 * @FilePath: /simple-ui/packages/date-time-picker/src/types/index.ts
 */
// 日期时间配置
export interface DateTimeConfig {
  date: Date;
  hour: number | null;
  minute: number | null;
  second: number | null;
}