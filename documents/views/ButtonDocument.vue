<!--
 * @Author: Quarter
 * @Date: 2020-09-29 15:32:26
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 08:16:52
 * @Description: 按钮的文档
 * @FilePath: /simple-ui/documents/views/ButtonDocument.vue
-->
<template>
  <div class="button-document">
    <document-page title="按钮 SimpleButton" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的按钮组件</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>fill</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否填充</td>
          </tr>
          <tr>
            <td>outline</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否框线</td>
          </tr>
          <tr>
            <td>round</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否圆角</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>SimpleSize</td>
            <td>否</td>
            <td>medium</td>
            <td>mini|small|medium|large</td>
            <td>按钮大小</td>
          </tr>
          <tr>
            <td>type</td>
            <td>否</td>
            <td>SimpleButtonType</td>
            <td>否</td>
            <td>normal</td>
            <td>cancel|normal|confirm|danger|linear</td>
            <td>按钮类型</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否禁用</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>click</td>
            <td>event: MouseEvent</td>
            <td>点击</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <simple-button type="cancel">取消</simple-button>
              <simple-button type="normal">普通</simple-button>
              <simple-button type="confirm">确认</simple-button>
              <simple-button type="success">成功</simple-button>
              <simple-button type="warning">警告</simple-button>
              <simple-button type="danger">危险</simple-button>
            </li>
            <li>
              <simple-button type="cancel" outline>取消</simple-button>
              <simple-button type="normal" outline>普通</simple-button>
              <simple-button type="confirm" outline>确认</simple-button>
              <simple-button type="success" outline>成功</simple-button>
              <simple-button type="warning" outline>警告</simple-button>
              <simple-button type="danger" outline>危险</simple-button>
            </li>
            <li>
              <simple-button type="cancel" outline round>取消</simple-button>
              <simple-button type="normal" outline round>普通</simple-button>
              <simple-button type="confirm" outline round>确认</simple-button>
              <simple-button type="success" outline round>成功</simple-button>
              <simple-button type="warning" outline round>警告</simple-button>
              <simple-button type="danger" outline round>危险</simple-button>
            </li>
            <li>
              <simple-button type="cancel" fill>取消</simple-button>
              <simple-button type="normal" fill>普通</simple-button>
              <simple-button type="confirm" fill>确认</simple-button>
              <simple-button type="success" fill>成功</simple-button>
              <simple-button type="warning" fill>警告</simple-button>
              <simple-button type="danger" fill>危险</simple-button>
            </li>
            <li>
              <simple-button type="cancel" fill round>取消</simple-button>
              <simple-button type="normal" fill round>普通</simple-button>
              <simple-button type="confirm" fill round>确认</simple-button>
              <simple-button type="success" fill round>成功</simple-button>
              <simple-button type="warning" fill round>警告</simple-button>
              <simple-button type="danger" fill round>危险</simple-button>
            </li>
            <li>
              <simple-button type="linear" fill>渐变色</simple-button>
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
<ul>
  <li>
    <simple-button type="cancel">取消</simple-button>
    <simple-button type="normal">普通</simple-button>
    <simple-button type="confirm">确认</simple-button>
    <simple-button type="success">成功</simple-button>
    <simple-button type="warning">警告</simple-button>
    <simple-button type="danger">危险</simple-button>
  </li>
  <li>
    <simple-button type="cancel" outline>取消</simple-button>
    <simple-button type="normal" outline>普通</simple-button>
    <simple-button type="confirm" outline>确认</simple-button>
    <simple-button type="success" outline>成功</simple-button>
    <simple-button type="warning" outline>警告</simple-button>
    <simple-button type="danger" outline>危险</simple-button>
  </li>
  <li>
    <simple-button type="cancel" outline round>取消</simple-button>
    <simple-button type="normal" outline round>普通</simple-button>
    <simple-button type="confirm" outline round>确认</simple-button>
    <simple-button type="success" outline round>成功</simple-button>
    <simple-button type="warning" outline round>警告</simple-button>
    <simple-button type="danger" outline round>危险</simple-button>
  </li>
  <li>
    <simple-button type="cancel" fill>取消</simple-button>
    <simple-button type="normal" fill>普通</simple-button>
    <simple-button type="confirm" fill>确认</simple-button>
    <simple-button type="success" fill>成功</simple-button>
    <simple-button type="warning" fill>警告</simple-button>
    <simple-button type="danger" fill>危险</simple-button>
  </li>
  <li>
    <simple-button type="cancel" fill round>取消</simple-button>
    <simple-button type="normal" fill round>普通</simple-button>
    <simple-button type="confirm" fill round>确认</simple-button>
    <simple-button type="success" fill round>成功</simple-button>
    <simple-button type="warning" fill round>警告</simple-button>
    <simple-button type="danger" fill round>危险</simple-button>
  </li>
  <li>
    <simple-button type="linear" fill>渐变色</simple-button>
  </li>
</ul>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.button-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-top: 20px;
      }
    }
  }
}
</style>