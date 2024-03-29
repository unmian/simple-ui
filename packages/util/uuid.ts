/*
 * @Author: Quarter
 * @Date: 2022-04-12 01:06:09
 * @LastEditTime: 2022-11-14 17:33:53
 * @LastEditors: Quarter
 * @Description: uuid 工具
 * @FilePath: /simple-ui/packages/util/uuid.ts
 */
/**
 * @description: 生成 UUID
 * @return {string}
 */
export const UUID = (): string => {
  const s: string[] = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substring((s[19] as any & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = "-";
  s[13] = "-";
  s[18] = "-";
  s[23] = "-";

  return s.join();
};
