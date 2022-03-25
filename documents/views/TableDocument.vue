<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:10:51
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/TableDocument.vue
-->
<template>
  <div class="table-document">
    <document-page title="表格 SimpleTable" :code="code">
      <template v-slot:example>
        <simple-table :table-data="tableData">
          <simple-table-column>123</simple-table-column>
        </simple-table>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      code: ``, // 示例代码
      tableData: [ // 表格数据
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
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
</style>