/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:20:12
 * @LastEditTime: 2022-06-10 11:13:43
 * @LastEditors: Quarter
 * @Description: 加载动画入口
 * @FilePath: /simple-ui/packages/loading/index.ts
 */
import LoadingDrectives from "./src/directives/loading";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.directive("loading", LoadingDrectives);
  },
} as PluginObject<any>;
