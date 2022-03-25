/*
 * @Author: Quarter
 * @Date: 2020-10-10 14:00:49
 * @LastEditors: Quarter
 * @LastEditTime: 2021-03-17 10:40:55
 * @Description: 工具函数
 * @FilePath: /simple-ui/src/simple-ui/expand/tool.ts
 */

/**
 * @description: 对象深度拷贝
 * @author: Quarter
 * @param {Object} obj 对象
 * @return {Object}
 */
function deepAssign<T>(obj: T): T {
  if (obj !== null && typeof obj === "object") {
    if (Array.isArray(obj)) {
      const assign: any = new Array();
      for (const item of obj) {
        if (typeof item === "object") {
          (assign as any[]).push(deepAssign(item));
        } else {
          (assign as any[]).push(item);
        }
      }
      return assign;
    } else {
      const assign: any = new Object();
      for (const key in obj) {
        if (true) {
          const item: any = (obj as any)[key];
          if (typeof item === "object") {
            (assign as any)[key] = deepAssign(item);
          } else {
            (assign as any)[key] = item;
          }
        }
      }
      return assign;
    }
  }
  return obj;
}

/**
 * @description: 生成 UUID
 * @author: Quarter
 * @return {String}
 */
const generateUUID = (): string => {
  const s: string[] = [];
  const hexDigits: string = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  // tslint:disable-next-line: no-bitwise
  s[19] = hexDigits.substr(((s[19] as any) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
};

export {
  deepAssign,
  generateUUID,
};