<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 11:53:44
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/BadgeDocument.vue
-->
<template>
  <div class="cool-button-document">
    <document-page title="标记 Badge" :code="code">
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
            <td>CommonSize</td>
            <td>否</td>
            <td>-</td>
            <td>mini/small/medium/large</td>
            <td>尺寸</td>
          </tr>
          <tr>
            <td>color</td>
            <td>否</td>
            <td>CommonSize</td>
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
              <s-badge :value="60" size="mini">
                <s-button type="normal" size="mini" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge :value="60" size="small">
                <s-button type="normal" size="small" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge :value="60" size="medium">
                <s-button type="normal" size="medium" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge :value="60" size="large">
                <s-button type="normal" size="large" outline>我的消息</s-button>
              </s-badge>
            </li>
          </ul>
          <ul>
            <li>
              <s-badge value="未读" size="mini">
                <s-button type="normal" size="mini" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge value="未读" size="small">
                <s-button type="normal" size="small" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge value="未读" size="medium">
                <s-button type="normal" size="medium" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge value="未读" size="large">
                <s-button type="normal" size="large" outline>我的消息</s-button>
              </s-badge>
            </li>
          </ul>
          <ul>
            <li>
              <s-badge size="mini">
                <s-button type="normal" size="mini" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge size="small">
                <s-button type="normal" size="small" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge size="medium">
                <s-button type="normal" size="medium" outline>我的消息</s-button>
              </s-badge>
            </li>
            <li>
              <s-badge size="large">
                <s-button type="normal" size="large" outline>我的消息</s-button>
              </s-badge>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";

@Component({
  name: "BadgeDocument",
  components: {
    DocumentPage,
  },
})
export default class BadgeDocument extends Vue {
  code = `
<div>
  <ul>
    <li>
      <s-badge :value="60" size="mini">
        <s-button type="normal" size="mini" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge :value="60" size="small">
        <s-button type="normal" size="small" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge :value="60" size="medium">
        <s-button type="normal" size="medium" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge :value="60" size="large">
        <s-button type="normal" size="large" outline>我的消息</s-button>
      </s-badge>
    </li>
  </ul>
  <ul>
    <li>
      <s-badge value="未读" size="mini">
        <s-button type="normal" size="mini" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge value="未读" size="small">
        <s-button type="normal" size="small" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge value="未读" size="medium">
        <s-button type="normal" size="medium" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge value="未读" size="large">
        <s-button type="normal" size="large" outline>我的消息</s-button>
      </s-badge>
    </li>
  </ul>
  <ul>
    <li>
      <s-badge size="mini">
        <s-button type="normal" size="mini" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge size="small">
        <s-button type="normal" size="small" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge size="medium">
        <s-button type="normal" size="medium" outline>我的消息</s-button>
      </s-badge>
    </li>
    <li>
      <s-badge size="large">
        <s-button type="normal" size="large" outline>我的消息</s-button>
      </s-badge>
    </li>
  </ul>
</div>
  `;
}
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