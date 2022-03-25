<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:08:33
 * @Description: 返回顶部文档
 * @FilePath: /simple-ui/documents/views/BacktopDocument.vue
-->
<template>
  <div class="backtop-document">
    <document-page title="返回顶部 SimpleBacktop" :code="code">
      <template v-slot:desc>
        <p>
          这是一个用以返回顶部的组件，需要和 SimpleScroll 搭配使用并作为
          SimpleScroll 的临近子组件。
        </p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>offset</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>距离底部的距离</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>SimpleSize</td>
            <td>否</td>
            <td>medium</td>
            <td>mini|small|medium</td>
            <td>显示大小</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--backtop-color</td>
            <td>#549fff</td>
            <td>color</td>
            <td>组件的颜色</td>
          </tr>
          <tr>
            <td>--backtop-radius</td>
            <td>与size相关联</td>
            <td>border-radius</td>
            <td>组件的圆角大小</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list" style="height: 500px">
          <simple-scroll full>
            <simple-backtop></simple-backtop>
            <div style="height: 1000px; background-color: #f9f9f9">1000px高的内容</div>
          </simple-scroll>
        </div>
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
      code: `
<div style="height: 500px;">
  <simple-scroll full>
    <simple-backtop></simple-backtop>
    <div style="height: 1000px;background-color: #f9f9f9;">1000px高的内容</div>
  </simple-scroll>
</div>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>