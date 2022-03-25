<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 14:50:34
 * @Description: 吸附文档
 * @FilePath: /simple-ui/documents/views/StickyDocument.vue
-->
<template>
  <div class="sticky-document">
    <document-page title="吸附 SimpleSticky" :code="code">
      <template v-slot:desc>
        <p>
          这是一个可以在滚动的时候吸附在容器边缘的组件，需要和 SimpleScroll
          搭配使用。
        </p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>position</td>
            <td>否</td>
            <td>SimplePosition</td>
            <td>否</td>
            <td>top</td>
            <td>top/left/right/bottom</td>
            <td>吸附的位置</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list" style="height: 300px">
          <simple-scroll full>
            <div style="height: 100px; background-color: #f3f3f3">我是上边的内容</div>
            <simple-sticky>
              <div style="height: 50px; line-height: 50px; background: #acf9f9">我是吸附的内容</div>
            </simple-sticky>
            <div style="height: 500px; background-color: #f3f3f3">我是下边的内容</div>
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
<div style="height: 300px">
  <simple-scroll full>
    <div style="height: 100px; background-color: #f3f3f3">
      我是上边的内容
    </div>
    <simple-sticky>
      <div style="height: 50px; line-height: 50px; background: #acf9f9">
        我是吸附的内容
      </div>
    </simple-sticky>
    <div style="height: 500px; background-color: #f3f3f3">
      我是下边的内容
    </div>
  </simple-scroll>
</div>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>