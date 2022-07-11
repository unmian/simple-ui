/*
 * @Author: Quarter
 * @Date: 2020-09-29 18:48:32
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 02:09:57
 * @Description: 日期函数扩充
 * @FilePath: /simple-ui/packages/util/date.ts
 */
/**
 * @description: 日期格式化
 * @author: Quarter
 * @param {Date|string|number} time 时间
 * @param {string} fmt 格式化字符串
 * @return {string}
 */
export const dateFormate = (time?: Date | string | number, fmt: string = "yy-MM-dd hh:mm:ss.SSS"): string => {
  let date: Date = new Date();
  if (time instanceof Date) {
    date = time;
  } else if (typeof time === "string" || typeof time === "number") {
    date = new Date(time);
  }
  const o: { [key: string]: string } = {
    "y+": date.getFullYear().toString(),                       // 年份
    "M+": (date.getMonth() + 1).toString(),                    // 月份
    "d+": date.getDate().toString(),                           // 日
    "h+": date.getHours().toString(),                          // 小时
    "m+": date.getMinutes().toString(),                        // 分
    "s+": date.getSeconds().toString(),                        // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3).toString(),    // 季度
    "S+": date.getMilliseconds().toString(),                   // 毫秒
  };
  // 循环字符替换
  Object.keys(o).forEach((k: string) => {
    const matchResult = fmt.match(new RegExp("(" + k + ")")) || [];
    const result = matchResult.length > 0 ? matchResult[0] : null;
    if (null !== result) {
      if (k === "y+") {
        fmt = fmt.replace(result, o[k].substring(4 - result.length));
      } else if (k === "S+") {
        let lens = result.length;
        lens = lens === 1 ? 3 : lens;
        fmt = fmt.replace(result, ("00" + o[k]).substring(o[k].length - 1, lens));
      } else {
        fmt = fmt.replace(result, result.length === 1 ? o[k] : ("00" + o[k]).substring(o[k].length));
      }
    }
  });
  return fmt;
};
