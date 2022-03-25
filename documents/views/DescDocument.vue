<!--
 * @Author: Quarter
 * @Date: 2020-09-29 13:23:29
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:03:54
 * @Description: 描述文档
 * @FilePath: /simple-ui/documents/views/DescDocument.vue
-->
<template>
  <div class="desc-document">
    <document-page title="描述 SimpleDesc" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的描述小标签，一般用来描述一些对象的属性信息。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>name</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>空字符串</td>
            <td>-</td>
            <td>属性的名称</td>
          </tr>
          <tr>
            <td>value</td>
            <td>否</td>
            <td>String|Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>属性的值</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--desc-color</td>
            <td>#29cb97</td>
            <td>color</td>
            <td>描述值的颜色</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <simple-desc name="所属部门" value="智慧城市业务部"></simple-desc>
            </li>
            <li>
              <simple-desc name="所在公司" value="南京莱斯网信技术研究院有限公司" style="--desc-color: #3d7fff"></simple-desc>
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
      code: `
<simple-desc name="所属部门" value="智慧城市业务部"></simple-desc>
<simple-desc name="所在公司" value="南京莱斯网信技术研究院有限公司" style="--desc-color: #3d7fff;"></simple-desc>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.desc-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-top: 15px;
      }
    }
  }
}
</style>