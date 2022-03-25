/*
 * @Author: Quarter
 * @Date: 2021-12-29 07:29:41
 * @LastEditTime: 2022-02-15 02:06:48
 * @LastEditors: Quarter
 * @Description: vite 文档配置
 * @FilePath: /t-ui-kit/build/doc.config.ts
 */
import baseConfig from "./base.config";
import { defineConfig } from "vite";

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: "docs",
  },
});