/*
 * @Author: Quarter
 * @Date: 2021-03-16 21:16:04
 * @LastEditTime: 2021-03-16 21:16:25
 * @LastEditors: Quarter
 * @Description: 日期
 * @FilePath: /simple-ui/src/simple-ui/types/date.d.ts
 */

// 日期方法扩充
interface Date {
  formate: (fmt: string) => string;
}