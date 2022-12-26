<!--
 * @Author: Quarter
 * @Date: 2021-03-11 19:51:27
 * @LastEditTime: 2022-12-13 15:41:45
 * @LastEditors: Quarter
 * @Description: 表格列
 * @FilePath: /simple-ui/packages/table/src/table-column.vue
-->
<template>
  <div class="s-table-cell">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

let columnSeed = 0;

@Component({
  name: "STableColumn",
})
export default class TableColumn extends Vue {
  //
  columnName = "";

  created(): void {
    this.columnName = `simple_table_column_${columnSeed++}`;
  }
}
</script>
