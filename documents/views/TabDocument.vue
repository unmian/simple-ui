<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 14:19:15
 * @Description: 标签页文档
 * @FilePath: /simple-ui/documents/views/TabDocument.vue
-->
<template>
  <div class="tab-document">
    <document-page title="标签页 SimpleTab" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的标签页组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>tabs</td>
            <td>否</td>
            <td>SimpleMenuItem[]</td>
            <td>否</td>
            <td>[]</td>
            <td>-</td>
            <td>标签页数组</td>
          </tr>
          <tr>
            <td>active</td>
            <td>否</td>
            <td>Number</td>
            <td>是</td>
            <td>0</td>
            <td>-</td>
            <td>当前选中的标签页</td>
          </tr>
          <tr>
            <td>align</td>
            <td>否</td>
            <td>SimpleDirection</td>
            <td>否</td>
            <td>horizontal</td>
            <td>horizontal/vertical</td>
            <td>标签页的排列方向</td>
          </tr>
          <tr>
            <td>mark</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示标记</td>
          </tr>
          <tr>
            <td>mark-mode</td>
            <td>否</td>
            <td>SimpleMarkMode</td>
            <td>否</td>
            <td>number</td>
            <td>dot/number</td>
            <td>标记的类型</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>
              index: Number 切换的标签页下标
              <br />tab: SimpleMenuItem 标签页的配置
            </td>
            <td>标签页切换</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--active-color</td>
            <td>#3d7fff</td>
            <td>color</td>
            <td>激活的标签页的颜色</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <div style="margin-bottom: 30px">横向标签页</div>
              <simple-tab :tabs="tabs"></simple-tab>
            </li>
            <li>
              <div style="margin-bottom: 30px">横向标签页</div>
              <simple-tab align="vertical" :tabs="tabs"></simple-tab>
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
import { SimpleMenuItem } from "packages";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      tabs: [
        {
          name: "首页",
        },
        {
          name: "数据目录",
        },
        {
          name: "互动交流",
        },
        {
          name: "用户中心",
        },
      ] as SimpleMenuItem[],
      code: `
<template>
  <div>
    <div style="margin-bottom: 30px;">横向标签页</div>
    <simple-tab :tabs="tabs"></simple-tab>
    <div style="margin-bottom: 30px;">横向标签页</div>
    <simple-tab align="vertical" :tabs="tabs"></simple-tab>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TabDocument extends Vue {
  // 标签页配置
  private readonly tabs: SimpleMenuItem[] = [
    {
      name: "首页",
    },
    {
      name: "数据目录",
    },
    {
      name: "互动交流",
    },
    {
      name: "用户中心",
    },
  ];
}
</${"script"}>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-top: 30px;
      }
    }
  }
}
</style>