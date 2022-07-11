/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:14:08
 * @LastEditTime: 2022-04-11 12:33:43
 * @LastEditors: Quarter
 * @Description: 表格组件入口
 * @FilePath: /simple-ui/packages/table/index.ts
 */
import Table from "./src/table.vue";
import TableColumn from "./src/table-column.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STable", Table);
    vue.component("STableColumn", TableColumn);
  },
} as PluginObject<any>;

export {
  Table,
  TableColumn,
};