/*
 * @Author: Quarter
 * @Date: 2022-04-12 01:05:05
 * @LastEditTime: 2022-11-14 18:11:38
 * @LastEditors: Quarter
 * @Description: 对象操作
 * @FilePath: /simple-ui/packages/util/object.ts
 */
/**
 * @description: 对象深度拷贝
 * @param {T} source 来源
 * @return {T}
 */
export const deepAssign = <T>(source: T): T => {
  if (source !== null && typeof source === "object") {
    if (Array.isArray(source)) {
      const target = [];
      for (const item of source) {
        if (typeof item === "object") {
          target.push(deepAssign(item));
        } else {
          target.push(item);
        }
      }
      return target as unknown as T;
    } 
      const target = Object.create(null);
      for (const key in source) {
        if (key) {
          const item: any = (source as any)[key];
          if (typeof item === "object") {
            Reflect.set(target, key, deepAssign(item));
          } else {
            Reflect.set(target, key, item);
          }
        }
      }
      return target;
    
  }
  return source;
};
