<!--
 * @Author: Quarter
 * @Date: 2021-03-09 21:26:05
 * @LastEditTime: 2022-04-08 06:15:12
 * @LastEditors: Quarter
 * @Description: 简易的表格组件
 * @FilePath: /simple-ui/packages/table/src/table.vue
-->
<template>
  <div class="s-table">
    <div class="main-table">
      <table>
        <thead></thead>
        <tbody>
          <tr v-for="(row, index) of fullTableData" :key="`main-table-row-${index}`">
            <td>
              <slot name="simple_table_1_column_1"></slot>
            </td>
            <td>
              <slot></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="fixed-table-header">
      <table>
        <thead></thead>
      </table>
    </div>
    <div class="fixed-left-table">
      <table>
        <thead></thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
    <div class="fixed-right-table">
      <table>
        <thead></thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "STable",
})
export default class STable extends Vue {
  @Prop(Array)
  tableData?: any[];

  get fullTableData(): any[] {
    if (Array.isArray(this.tableData)) {
      return this.tableData;
    }
    return new Array();
  }

  mounted(): void {
    /* setInterval(() => {
      console.log(this.$slots);
    }, 1000); */
  }
}
</script>