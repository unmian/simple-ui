<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:16:16
 * @Description: 展开动画文档
 * @FilePath: /simple-ui/documents/views/document/CollapseDocument.vue
-->
<template>
  <div class="collapse-document">
    <document-page title="展开动画 CollapseTransition" :code="code">
      <template v-slot:desc>
        <p>这是一个展开动画组件。</p>
        <p>注意：请不要对本组件的临近子元素添加 width/height 的行内样式。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>align</td>
            <td>否</td>
            <td>CommonDirection</td>
            <td>否</td>
            <td>vertical</td>
            <td>vertical/horizontal</td>
            <td>展开方向</td>
          </tr>
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
          <ul>
            <li>
              <s-button outline type="normal" @click="boxOne = !boxOne">切换显示内容</s-button>
              <div style="width: 200px; height: 200px; margin-top: 30px">
                <collapse-transition>
                  <div v-show="boxOne">
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
                </collapse-transition>
              </div>
            </li>
            <li>
              <s-button outline type="normal" @click="boxTow = !boxTow">切换显示内容</s-button>
              <div style="width: 200px; height: 200px; margin-top: 30px">
                <collapse-transition align="horizontal">
                  <div v-show="boxTow">
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
                </collapse-transition>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CollapseDocument",
  components: {
    DocumentPage,
  },
})
export default class CollapseDocument extends Vue {
  boxOne = true; // 是否隐藏内容
  boxTow = true; // 是否隐藏内容
  code = ""; // 示例代码
}
</script>

<style lang="scss" scoped>
.collapse-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0;
    }
  }
}
</style>
