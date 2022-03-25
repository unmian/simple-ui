<!--
 * @Author: Quarter
 * @Date: 2020-09-29 13:51:52
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:18:21
 * @Description: 路径文档
 * @FilePath: /simple-ui/documents/views/PathDocument.vue
-->

<template>
  <div class="path-document">
    <document-page title="路径 SimplePath" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的展示路径的组件</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>path</td>
            <td>否</td>
            <td>SimpleMenuItem[]</td>
            <td>否</td>
            <td>[]</td>
            <td>-</td>
            <td>路径数组</td>
          </tr>
          <tr>
            <td>click</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>true</td>
            <td>true/false</td>
            <td>是否可以点击跳转</td>
          </tr>
          <tr>
            <td>show-mark</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>true</td>
            <td>true/false</td>
            <td>是否显示标记</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--mark-color</td>
            <td>#5474ff</td>
            <td>color</td>
            <td>标记的颜色</td>
          </tr>
          <tr>
            <td>--selected-color</td>
            <td>inherit</td>
            <td>color</td>
            <td>当前页面的路径颜色</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <simple-path :path="path" :click="false" :show-mark="false"></simple-path>
            </li>
            <li>
              <simple-path :path="path" :click="false"></simple-path>
            </li>
            <li>
              <simple-path :path="path"></simple-path>
            </li>
            <li>
              <simple-path :path="path" style="--mark-color: #f04134;--selected-color: #f04134;"></simple-path>
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
      path: [
        { name: "系统管理", path: "/path" },
        { name: "日志管理", path: "/path" },
        { name: "登录日志", path: "/path" },
      ] as SimpleMenuItem[],
      code: `
<template>
  <div>
    <simple-path :path="path" :click="false" :show-mark="false"></simple-path>
    <simple-path :path="path" :click="false"></simple-path>
    <simple-path :path="path"></simple-path>
    <simple-path :path="path" style="--mark-color: #f04134;--selected-color: #f04134;"></simple-path>
  </div>
</template>

<${"script"} lang="ts">
import Vue from "vue";
import { SimpleMenuItem } from "simple-ui";

${"export default Vue.extend"}({
  data() {
    return {
      path: [
        { name: "系统管理", path: "/path" },
        { name: "日志管理", path: "/path" },
        { name: "登录日志", path: "/path" },
      ] as SimpleMenuItem[],
    };
  },
});
</${"script"}>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.path-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;
    }
  }
}
</style>