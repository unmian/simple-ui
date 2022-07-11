/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:08:19
 * @LastEditTime: 2022-06-10 11:13:48
 * @LastEditors: Quarter
 * @Description: 分页组件入口
 * @FilePath: /simple-ui/packages/pagination/index.ts
 */
import Pagination from "./src/pagination.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPagination", Pagination);
  },
} as PluginObject<any>;

export * from "./src/types";
export { Pagination };
