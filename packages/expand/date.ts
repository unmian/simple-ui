/*
 * @Author: Quarter
 * @Date: 2020-09-29 18:48:32
 * @LastEditors: Quarter
 * @LastEditTime: 2020-10-10 14:00:35
 * @Description: 日期函数扩充
 * @FilePath: /simple-ui/src/simple-ui/expand/date.ts
 */

Date.prototype.formate = function(fmt: string) {
  const o: any = {
    "y+": this.getFullYear(),                       // 年份
    "M+": this.getMonth() + 1,                      // 月份
    "d+": this.getDate(),                           // 日
    "h+": this.getHours(),                          // 小时
    "m+": this.getMinutes(),                        // 分
    "s+": this.getSeconds(),                        // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3),    // 季度
    "S+": this.getMilliseconds(),                   // 毫秒
  };
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k === "y+") {
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if (k === "S+") {
        let lens = RegExp.$1.length;
        lens = lens === 1 ? 3 : lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
      }
      else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
};