<!--
 * @Author: Quarter
 * @Date: 2021-03-09 21:26:05
 * @LastEditTime: 2022-03-24 15:20:07
 * @LastEditors: Quarter
 * @Description: 简易的表格组件
 * @FilePath: /simple-ui/packages/components/SimpleTable.vue
-->
<template>
  <div class="simple-table">
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
import Vue from "vue";

export default Vue.extend({
  name: "SimpleTable",
  props: {
    tableData: Array,
  },
  computed: {
    fullTableData(): any[] {
      if (Array.isArray(this.tableData)) {
        return this.tableData;
      }
      return new Array();
    },
  },
  mounted(): void {
    /* setInterval(() => {
      console.log(this.$slots);
    }, 1000); */
  },
});
</script>