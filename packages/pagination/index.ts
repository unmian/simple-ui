/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:08:19
 * @LastEditTime: 2022-11-14 17:51:33
 * @LastEditors: Quarter
 * @Description: 分页组件入口
 * @FilePath: /simple-ui/packages/pagination/index.ts
 */
import Pagination from "./src/pagination.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SPagination", Pagination);
  },
};

type PaginationInstance = InstanceType<typeof Pagination>;

export default plugin;
export * from "./src/types";
export { Pagination, PaginationInstance };
