<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:00:13
 * @Description: 分页文档
 * @FilePath: /simple-ui/documents/views/PaginationDocument.vue
-->
<template>
  <div class="pagination-document">
    <document-page title="分页 Pagination" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的分页组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>total</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>0</td>
            <td>-</td>
            <td>记录总数</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>Number</td>
            <td>是</td>
            <td>10</td>
            <td>-</td>
            <td>分页大小</td>
          </tr>
          <tr>
            <td>page</td>
            <td>否</td>
            <td>Number</td>
            <td>是</td>
            <td>1</td>
            <td>-</td>
            <td>页码</td>
          </tr>
          <tr>
            <td>align</td>
            <td>否</td>
            <td>CommonAlign</td>
            <td>否</td>
            <td>left</td>
            <td>left/center/right</td>
            <td>排列方式</td>
          </tr>
          <tr>
            <td>show-counter</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示总数</td>
          </tr>
          <tr>
            <td>show-pagination</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示分页配置</td>
          </tr>
          <tr>
            <td>show-jumper</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示页码跳转</td>
          </tr>
          <tr>
            <td>show-word</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示文字按钮</td>
          </tr>
          <tr>
            <td>plain</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示纯文字</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>
              page: Number 页码
              <br />size: Number 分页大小
            </td>
            <td>页码或分页大小发生变更</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-pagination :total="121" :size="20" :page="2"></s-pagination>
          <s-pagination
            :total="121"
            :size="20"
            :page="2"
            show-counter
            show-pagination
            show-jumper
          ></s-pagination>
          <s-pagination
            :total="121"
            :size="20"
            :page="2"
            show-counter
            show-pagination
            show-jumper
            show-word
          ></s-pagination>
          <s-pagination
            :total="121"
            :size="20"
            :page="2"
            show-counter
            show-pagination
            show-jumper
            plain
          ></s-pagination>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PaginationDocument",
  components: {
    DocumentPage,
  },
})
export default class PaginationDocument extends Vue {
  code = `
<s-pagination :total="121" :size="20" :page="2"></s-pagination>
<s-pagination
  :total="121"
  :size="20"
  :page="2"
  show-counter
  show-pagination
  show-jumper
></s-pagination>
<s-pagination
  :total="121"
  :size="20"
  :page="2"
  show-counter
  show-pagination
  show-jumper
  show-word
></s-pagination>
<s-pagination
  :total="121"
  :size="20"
  :page="2"
  show-counter
  show-pagination
  show-jumper
  plain
></s-pagination>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
.example-list .s-pagination:nth-child(n + 2) {
  margin-top: 20px;
}
</style>