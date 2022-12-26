/*
 * @Author: Quarter
 * @Date: 2021-12-29 07:28:23
 * @LastEditTime: 2022-07-06 13:47:09
 * @LastEditors: Quarter
 * @Description: vite 基础配置
 * @FilePath: /simple-ui/build/base.config.ts
 */
import { resolve } from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

// 文档: https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    strictPort: true,
    proxy: {
      "/socket.io": {
        ws: true,
        target: "http://192.168.80.175:9099",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      documents: resolve(__dirname, "../documents"),
      icons: resolve(__dirname, "../icons"),
      packages: resolve(__dirname, "../packages"),
      "@unmian/simple-ui": resolve(__dirname, "../packages"),
    },
  },
  plugins: [
    createVuePlugin({ include: [/\.vue$/] }),
  ],
});
