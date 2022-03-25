<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:01:16
 * @Description: 缩放动画文档
 * @FilePath: /simple-ui/documents/views/ScaleDocument.vue
-->
<template>
  <div class="scale-document">
    <document-page title="缩放动画 ScaleTransition" :code="code">
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
            <td>SimpleTransitionType</td>
            <td>否</td>
            <td>linear</td>
            <td>linear/ease/ease-in/ease-out/ease-in-out/revert</td>
            <td>动画过渡方式</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <simple-button outline type="normal" @click="boxVisible = !boxVisible">切换显示内容</simple-button>
          <div style="width: 200px; height: 200px; margin-top: 30px">
            <scale-transition>
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
                >内容</div>
              </div>
            </scale-transition>
          </div>
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
      boxVisible: true, // 是否显示
      code: `
<template>
  <div>
    <simple-button outline type="normal" @click="boxVisible = !boxVisible"
      >切换显示内容</simple-button
    >
    <div style="width: 200px; height: 200px; margin-top: 30px">
      <scale-transition>
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
      </scale-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ScaleDocument extends Vue {
  // 是否显示
  private boxVisible: boolean = true;
}
</${"script"}>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>