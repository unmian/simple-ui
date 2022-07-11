<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-04-12 12:00:27
 * @LastEditors: Quarter
 * @Description: 路径文档
 * @FilePath: /simple-ui/documents/views/PathDocument.vue
-->
<template>
  <div class="path-document">
    <document-page title="路径 Path" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的展示路径的组件</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>path</td>
            <td>否</td>
            <td>MenuItem[]</td>
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
              <s-path :path="path" :click="false" :show-mark="false"></s-path>
            </li>
            <li>
              <s-path :path="path" :click="false"></s-path>
            </li>
            <li>
              <s-path :path="path"></s-path>
            </li>
            <li>
              <s-path :path="path" style="--mark-color: #f04134;--selected-color: #f04134;"></s-path>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { MenuItem } from "@quarter/simple-ui";
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PathDocument",
  components: {
    DocumentPage,
  },
})
export default class PathDocument extends Vue {
  path: MenuItem[] = [ // 路径配置
    { name: "系统管理", path: "/path" },
    { name: "日志管理", path: "/path" },
    { name: "登录日志", path: "/path" },
  ];
  code = `
<template>
  <div>
    <s-path :path="path" :click="false" :show-mark="false"></s-path>
    <s-path :path="path" :click="false"></s-path>
    <s-path :path="path"></s-path>
    <s-path :path="path" style="--mark-color: #f04134;--selected-color: #f04134;"></s-path>
  </div>
</template>

<${"script"} lang="ts">
import Vue from "vue";
import { MenuItem } from "@quarter/simple-ui";

${"export default Vue.extend"}({
  data() {
    return {
      path: [
        { name: "系统管理", path: "/path" },
        { name: "日志管理", path: "/path" },
        { name: "登录日志", path: "/path" },
      ] as MenuItem[],
    };
  },
});
</${"script"}>
  `; // 示例代码
}
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