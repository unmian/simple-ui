<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:01:37
 * @Description: 吸附文档
 * @FilePath: /simple-ui/documents/views/StickyDocument.vue
-->
<template>
  <div class="sticky-document">
    <document-page title="吸附 Sticky" :code="code">
      <template v-slot:desc>
        <p>
          这是一个可以在滚动的时候吸附在容器边缘的组件，需要和 Scroll 搭配使用。
        </p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>position</td>
            <td>否</td>
            <td>CommonPosition</td>
            <td>否</td>
            <td>top</td>
            <td>top/left/right/bottom</td>
            <td>吸附的位置</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list" style="height: 300px">
          <s-scroll full>
            <div style="height: 100px; background-color: #f3f3f3">我是上边的内容</div>
            <s-sticky>
              <div style="height: 50px; line-height: 50px; background: #acf9f9">我是吸附的内容</div>
            </s-sticky>
            <div style="height: 500px; background-color: #f3f3f3">我是下边的内容</div>
          </s-scroll>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "StickyDocument",
  components: {
    DocumentPage,
  },
})
export default class StickyDocument extends Vue {
  code = `
<div style="height: 300px">
  <s-scroll full>
    <div style="height: 100px; background-color: #f3f3f3">
      我是上边的内容
    </div>
    <s-sticky>
      <div style="height: 50px; line-height: 50px; background: #acf9f9">
        我是吸附的内容
      </div>
    </s-sticky>
    <div style="height: 500px; background-color: #f3f3f3">
      我是下边的内容
    </div>
  </s-scroll>
</div>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
</style>