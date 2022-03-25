<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:14:04
 * @Description: 展开动画文档
 * @FilePath: /simple-ui/documents/views/CollapseDocument.vue
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
            <td>SimpleDirection</td>
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
          <ul>
            <li>
              <simple-button outline type="normal" @click="boxOne = !boxOne">切换显示内容</simple-button>
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
                    >内容</div>
                  </div>
                </collapse-transition>
              </div>
            </li>
            <li>
              <simple-button outline type="normal" @click="boxTow = !boxTow">切换显示内容</simple-button>
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
                    >内容</div>
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
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      boxOne: true, // 是否隐藏内容
      boxTow: true, // 是否隐藏内容
      code: `
<template>
  <div>
    <ul>
      <li>
        <simple-button
          outline
          type="normal"
          @click="boxOne = !boxOne"
          >切换显示内容</simple-button
        >
        <div style="width: 200px; height: 200px;margin-top: 30px;">
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
        <simple-button
          outline
          type="normal"
          @click="boxTow = !boxTow"
          >切换显示内容</simple-button
        >
        <div style="width: 200px; height: 200px;margin-top: 30px;">
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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class CollapseDocument extends Vue {
  // 是否隐藏内容
  private boxOne: boolean = true;
  private boxTow: boolean = true;
}
</${"script"}>
      `,
    };
  },
});
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