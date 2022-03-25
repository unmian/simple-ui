<!--
 * @Author: Quarter
 * @Date: 2021-03-11 19:51:27
 * @LastEditTime: 2021-09-30 16:45:59
 * @LastEditors: Quarter
 * @Description: 表格列
 * @FilePath: /simple-ui/src/simple-ui/components/SimpleTableColumn.vue
-->
<template>
  <div class="simple-table-cell">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

let columnSeed: number = 0;

@Component({
  name: "SimpleTableColumn",
})
export default class SimpleTableColumn extends Vue {
  //
  private columnName: string = "";

  public created(): void {
    this.columnName = `simple_table_column_${columnSeed++}`;
  }
}
</script>