<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-03-24 15:45:59
 * @LastEditors: Quarter
 * @Description: 文档页
 * @FilePath: /simple-ui/documents/components/DocumentPage.vue
-->
<template>
  <div class="document-page">
    <div class="page-name">{{ title }}</div>
    <div class="document-desc">
      <slot name="desc"></slot>
    </div>
    <div class="component-prop" v-if="hasProp">
      <div class="block-title">属性</div>
      <div class="block-content">
        <table>
          <thead>
            <tr>
              <th>属性名称</th>
              <th>是否必须</th>
              <th>类型</th>
              <th>.sync修饰符</th>
              <th>默认值</th>
              <th>可选值</th>
              <th>描述</th>
            </tr>
          </thead>
          <slot name="prop"></slot>
        </table>
      </div>
    </div>
    <div class="component-slot" v-if="hasSlot">
      <div class="block-title">插槽</div>
      <div class="block-content">
        <table>
          <thead>
            <tr>
              <th>插槽名称</th>
              <th>描述</th>
            </tr>
          </thead>
          <slot name="slot"></slot>
        </table>
      </div>
    </div>
    <div class="component-method" v-if="hasMethod">
      <div class="block-title">方法</div>
      <div class="block-content">
        <table>
          <thead>
            <tr>
              <th>方法名称</th>
              <th>参数</th>
              <th>返回值</th>
              <th>描述</th>
            </tr>
          </thead>
          <slot name="method"></slot>
        </table>
      </div>
    </div>
    <div class="component-style" v-if="hasStyle">
      <div class="block-title">样式</div>
      <div class="block-content">
        <table>
          <thead>
            <tr>
              <th>样式名称</th>
              <th>默认值</th>
              <th>样式类别</th>
              <th>描述</th>
            </tr>
          </thead>
          <slot name="style"></slot>
        </table>
      </div>
    </div>
    <div class="component-event" v-if="hasEvent">
      <div class="block-title">事件</div>
      <div class="block-content">
        <table>
          <thead>
            <tr>
              <th>事件名称</th>
              <th>事件参数</th>
              <th>描述</th>
            </tr>
          </thead>
          <slot name="event"></slot>
        </table>
      </div>
    </div>
    <div class="component-example" v-if="hasExample">
      <div class="block-title">示例</div>
      <div class="block-content">
        <div class="examples">
          <slot name="example"></slot>
        </div>
        <div class="example-code" v-if="hasCode">
          <collapse-transition>
            <pre v-if="showCode">{{ code }}</pre>
          </collapse-transition>
          <div class="show-code">
            <simple-button type="normal" @click="switchCode">
              <i :class="`simple-icon-caret-${showCode ? 'top' : 'bottom'}`"></i>
              示例代码
            </simple-button>
          </div>
        </div>
      </div>
    </div>
    <div class="other-info" v-if="hasDefault">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { } from "vue";

export default Vue.extend({
  name: "DocumentPage",
  props: {
    title: String, // 页面标题
    code: String, // 代码字符串
  },
  data() {
    return {
      showCode: false, // 是否显示代码
      hasProp: false, // 是否存在属性
      hasSlot: false, // 是否存在插槽
      hasMethod: false, // 是否存在方法
      hasEvent: false, // 是否存在事件
      hasStyle: false, // 是否存在样式
      hasExample: false, // 是否存在示例
      hasDefault: false, // 是否存在默认
    };
  },
  computed: {
    /**
     * @description: 是否存在代码
     * @author: Quarter
     * @return {boolean}
     */
    hasCode(): boolean {
      return typeof this.code === "string" && this.code.length > 0;
    },
  },
  mounted() {
    this.hasProp = this.$slots.prop !== undefined;
    this.hasSlot = this.$slots.slot !== undefined;
    this.hasMethod = this.$slots.method !== undefined;
    this.hasStyle = this.$slots.style !== undefined;
    this.hasEvent = this.$slots.event !== undefined;
    this.hasExample = this.$slots.example !== undefined;
    this.hasDefault = this.$slots.default !== undefined;
  },
  methods: {
    /**
     * @description: 切换示例代码显示
     * @author: Quarter
     * @return
     */
    switchCode(): void {
      this.showCode = !this.showCode;
    },
  }
});
</script>

<style lang="scss" scoped>
.document-page {
  width: 100%;
  color: #555555;
  font-size: 14px;

  > div:nth-of-type(n + 2) {
    margin-top: 50px;
  }

  .page-name {
    color: #1f1f1f;
    font-size: 24px;
    font-weight: bold;
  }

  .block-title {
    color: #393939;
    font-size: 16px;
    font-weight: bold;
  }

  .block-content {
    margin-top: 20px;
  }

  table {
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      border: #e1dee2 1px solid;
    }

    th {
      color: #666666;
      background-color: #f0f5fa;
    }
  }

  .document-desc p {
    text-indent: 28px;
  }

  .component-example .block-content {
    border: 1px solid #e1dee2;
    box-sizing: border-box;

    .examples {
      padding: 20px;
      box-sizing: border-box;
    }

    .example-code {
      pre {
        line-height: 1.5;
        background-color: #f5f7fa;
        margin: 15px 0 0;
      }

      .show-code {
        padding: 3px 0;
        text-align: center;
        border-top: 1px solid #e1dee2;
        background-color: #f0f5fa;

        button {
          font-size: 14px;
        }
      }
    }
  }

  &:nth-of-type(n + 2) {
    margin-top: 80px;
  }
}
</style>