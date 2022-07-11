<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:02:14
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/TableDocument.vue
-->
<template>
  <div class="table-document">
    <document-page title="表格 Table" :code="code">
      <template v-slot:example>
        <s-table :table-data="tableData">
          <s-table-column>123</s-table-column>
        </s-table>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "TableDocument",
  components: {
    DocumentPage,
  },
})
export default class TableDocument extends Vue {
  code = ``; // 示例代码
  tableData = [ // 表格数据
    {
      name: "张三",
      sex: 1,
      hobby: "篮球、羽毛球、足球",
    },
    {
      name: "李四",
      sex: 1,
      hobby: "乒乓球、发烧友",
    },
    {
      name: "张小红",
      sex: 0,
      hobby: "电影、插花",
    },
  ];
}
</script>

<style lang="scss" scoped>
</style>