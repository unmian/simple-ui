/*
 * @Author: Quarter
 * @Date: 2022-04-08 06:14:08
 * @LastEditTime: 2022-12-14 09:02:30
 * @LastEditors: Quarter
 * @Description: 表格组件入口
 * @FilePath: /simple-ui/packages/table/index.ts
 */
import Table from "./src/table.vue";
import TableColumn from "./src/table-column.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STable", Table);
    vue.component("STableColumn", TableColumn);
  },
};

type TableInstance = InstanceType<typeof Table>;
type TableColumnInstance = InstanceType<typeof TableColumn>;

export default plugin;
export { Table, TableInstance, TableColumn, TableColumnInstance };
