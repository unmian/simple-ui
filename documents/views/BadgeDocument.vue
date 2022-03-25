<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:57:54
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/BadgeDocument.vue
-->
<template>
  <div class="cool-button-document">
    <document-page title="标记 SimpleBadge" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的标记组件，一般用来标注一些新消息等内容。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>value</td>
            <td>否</td>
            <td>String|Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>值</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>SimpleSize</td>
            <td>否</td>
            <td>-</td>
            <td>mini/small/medium/large</td>
            <td>尺寸</td>
          </tr>
          <tr>
            <td>color</td>
            <td>否</td>
            <td>SimpleSize</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>背景颜色</td>
          </tr>
          <tr>
            <td>invalid</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否失效</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <simple-badge :value="60" size="mini">
                <simple-button type="normal" size="mini" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge :value="60" size="small">
                <simple-button type="normal" size="small" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge :value="60" size="medium">
                <simple-button type="normal" size="medium" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge :value="60" size="large">
                <simple-button type="normal" size="large" outline>我的消息</simple-button>
              </simple-badge>
            </li>
          </ul>
          <ul>
            <li>
              <simple-badge value="未读" size="mini">
                <simple-button type="normal" size="mini" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge value="未读" size="small">
                <simple-button type="normal" size="small" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge value="未读" size="medium">
                <simple-button type="normal" size="medium" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge value="未读" size="large">
                <simple-button type="normal" size="large" outline>我的消息</simple-button>
              </simple-badge>
            </li>
          </ul>
          <ul>
            <li>
              <simple-badge size="mini">
                <simple-button type="normal" size="mini" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge size="small">
                <simple-button type="normal" size="small" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge size="medium">
                <simple-button type="normal" size="medium" outline>我的消息</simple-button>
              </simple-badge>
            </li>
            <li>
              <simple-badge size="large">
                <simple-button type="normal" size="large" outline>我的消息</simple-button>
              </simple-badge>
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
<div>
  <ul>
    <li>
      <simple-badge :value="60" size="mini">
        <simple-button type="normal" size="mini" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge :value="60" size="small">
        <simple-button type="normal" size="small" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge :value="60" size="medium">
        <simple-button type="normal" size="medium" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge :value="60" size="large">
        <simple-button type="normal" size="large" outline>我的消息</simple-button>
      </simple-badge>
    </li>
  </ul>
  <ul>
    <li>
      <simple-badge value="未读" size="mini">
        <simple-button type="normal" size="mini" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge value="未读" size="small">
        <simple-button type="normal" size="small" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge value="未读" size="medium">
        <simple-button type="normal" size="medium" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge value="未读" size="large">
        <simple-button type="normal" size="large" outline>我的消息</simple-button>
      </simple-badge>
    </li>
  </ul>
  <ul>
    <li>
      <simple-badge size="mini">
        <simple-button type="normal" size="mini" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge size="small">
        <simple-button type="normal" size="small" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge size="medium">
        <simple-button type="normal" size="medium" outline>我的消息</simple-button>
      </simple-badge>
    </li>
    <li>
      <simple-badge size="large">
        <simple-button type="normal" size="large" outline>我的消息</simple-button>
      </simple-badge>
    </li>
  </ul>
</div>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.example-list ul {
  list-style: none;
  display: flex;

  li {
    &:nth-of-type(n + 2) {
      margin-left: 30px;
    }
  }

  &:nth-of-type(n + 2) {
    margin-top: 20px;
  }
}
</style>