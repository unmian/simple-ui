<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:36:50
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/EscapeDocument.vue
-->
<template>
  <div class="escape-document">
    <document-page title="HTML 转义符对照表">
      <template v-slot:default>
        <table>
          <thead>
            <tr>
              <th>特殊符号</th>
              <th>名称</th>
              <th>转义代码</th>
              <th>特殊符号</th>
              <th>名称</th>
              <th>转义代码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index of Math.ceil(escapeMap.length / 2)" :key="`table-row-${index}`">
              <td>{{ escapeMap[2 * index - 2] ? escapeMap[2 * index - 2].symbol : "" }}</td>
              <td>{{ escapeMap[2 * index - 2] ? escapeMap[2 * index - 2].name : "" }}</td>
              <td>{{ escapeMap[2 * index - 2] ? escapeMap[2 * index - 2].code : "" }}</td>
              <td>{{ escapeMap[2 * index - 1] ? escapeMap[2 * index - 1].symbol : "" }}</td>
              <td>{{ escapeMap[2 * index - 1] ? escapeMap[2 * index - 1].name : "" }}</td>
              <td>{{ escapeMap[2 * index - 1] ? escapeMap[2 * index - 1].code : "" }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import escapeList from "documents/assets/escape.json";

export default Vue.extend({
  name: "EscapeDocument",
  components: {
    DocumentPage,
  },
  data() {
    return {
      escapeMap: escapeList,
    };
  },
});
</script>