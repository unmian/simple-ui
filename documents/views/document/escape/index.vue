<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-08 14:41:29
 * @LastEditors: Quarter
 * @Description: HTML 转义符对照表文档
 * @FilePath: /simple-ui/documents/views/document/escape/index.vue
-->
<template>
  <div class="escape-document">
    <document-page title="HTML 转义符对照表">
      <template v-slot:desc>
        <p>这是一个常用的 HTML 转义符对照表，参照下表可以快速找到特殊符号对应的转译代码</p>
      </template>
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
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";
import escapeMap from "documents/assets/escape.json";

@Component({
  name: "EscapeDocument",
  components: {
    DocumentPage,
  },
})
export default class EscapeDocument extends Vue {
  escapeMap = escapeMap; // 转译列表
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  max-width: 1000px;
}
</style>
