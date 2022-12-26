<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:17:08
 * @Description: 缩放动画文档
 * @FilePath: /simple-ui/documents/views/document/FadeDocument.vue
-->
<template>
  <div class="fade-document">
    <document-page title="透明度动画 FadeTransition" :code="code">
      <template v-slot:desc>
        <p>这是一个缩放过渡组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>duration</td>
            <td>否</td>
            <td>String/Number</td>
            <td>否</td>
            <td>0.2</td>
            <td>-</td>
            <td>动画时间，单位为s</td>
          </tr>
          <tr>
            <td>transition</td>
            <td>否</td>
            <td>TransitionType</td>
            <td>否</td>
            <td>linear</td>
            <td>linear/ease/ease-in/ease-out/ease-in-out/revert</td>
            <td>动画过渡方式</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-button outline type="normal" @click="boxVisible = !boxVisible">切换显示内容</s-button>
          <div style="width: 200px; height: 200px; margin-top: 30px">
            <fade-transition>
              <div v-show="boxVisible">
                <div
                  style="
                    width: 200px;
                    height: 200px;
                    background-color: #c9a6f8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  内容
                </div>
              </div>
            </fade-transition>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FadeDocument",
  components: {
    DocumentPage,
  },
})
export default class FadeDocument extends Vue {
  boxVisible = true; // 是否显示
  code = ""; // 示例代码
}
</script>

<style lang="scss" scoped></style>
