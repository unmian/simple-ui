<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-08 14:32:01
 * @LastEditors: Quarter
 * @Description: 文档页
 * @FilePath: /simple-ui/documents/components/document-page/index.vue
-->
<template>
  <div class="document-page">
    <div class="page-name">{{ title }}</div>
    <div class="document-desc" v-show="hasDesc">
      <slot name="desc"></slot>
    </div>
    <div v-if="menus.length > 0" class="document-content">
      <s-tab :tabs="menus" @change="changeMenu"></s-tab>
      <div class="desc-detail">
        <div class="component-prop" v-show="1 === activeMenu">
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
        <div class="component-slot" v-if="2 === activeMenu">
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
        <div class="component-method" v-if="3 === activeMenu">
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
        <div class="component-style" v-if="4 === activeMenu">
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
        <div class="component-event" v-if="5 === activeMenu">
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
        <div class="component-example" v-if="6 === activeMenu">
          <slot name="example"></slot>
        </div>
      </div>
    </div>
    <div class="other-info" v-if="hasDefault">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { MenuItem } from "@quarter/simple-ui";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "DocumentPage",
})
export default class DocumentPage extends Vue {
  // 页面标题
  @Prop(String)
  title?: string;

  // 选中的菜单
  activeMenu = 0;
  // 是否显示代码
  showCode = false;
  // 是否存在描述
  hasDesc = false;
  // 是否存在属性
  hasProp = false;
  // 是否存在插槽
  hasSlot = false;
  // 是否存在方法
  hasMethod = false;
  // 是否存在事件
  hasEvent = false;
  // 是否存在样式
  hasStyle = false;
  // 是否存在示例
  hasExample = false;
  // 是否存在默认
  hasDefault = false;

  /**
   * @description: 菜单列表
   * @author: Quarter
   * @return {MenuItem[]}
   */
  get menus(): MenuItem[] {
    const menus = [] as MenuItem[];
    if (this.hasProp) {
      menus.push({ name: "组件属性", value: 1 });
    }
    if (this.hasSlot) {
      menus.push({ name: "内容插槽", value: 2 });
    }
    if (this.hasMethod) {
      menus.push({ name: "调用方法", value: 3 });
    }
    if (this.hasEvent) {
      menus.push({ name: "自定义事件", value: 4 });
    }
    if (this.hasStyle) {
      menus.push({ name: "自定义样式", value: 5 });
    }
    if (this.hasExample) {
      menus.push({ name: "示例代码", value: 6 });
    }
    if (menus.length > 0) {
      this.activeMenu = menus[0].value as number;
    }
    return menus;
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    this.hasDesc = this.$slots.desc !== undefined;
    this.hasProp = this.$slots.prop !== undefined;
    this.hasSlot = this.$slots.slot !== undefined;
    this.hasMethod = this.$slots.method !== undefined;
    this.hasStyle = this.$slots.style !== undefined;
    this.hasEvent = this.$slots.event !== undefined;
    this.hasExample = this.$slots.example !== undefined;
    this.hasDefault = this.$slots.default !== undefined;
  }

  /**
   * @description: 切换菜单
   * @author: Quarter
   * @return
   */
  changeMenu(_: number, menu: MenuItem): void {
    this.activeMenu = menu.value as number;
  }

  /**
   * @description: 切换示例代码显示
   * @author: Quarter
   * @return
   */
  switchCode(): void {
    this.showCode = !this.showCode;
  }
}
</script>

<style lang="scss">
.document-page {
  width: 100%;
  padding: 50px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: var(--s-background-primary);

  > div:nth-of-type(n + 2) {
    margin-top: 32px;
  }

  .page-name {
    font-size: 24px;
    font-weight: bold;
  }

  .document-desc {
    color: var(--s-text-secondary);
  }

  .desc-detail {
    box-sizing: border-box;
    margin-top: 24px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      text-align: center;
      border-bottom: var(--s-gray-100) 1px solid;
    }

    th {
      font-weight: bold;
      background-color: var(--s-gray-100);

      &:first-of-type {
        border-left: var(--s-gray-100) 1px solid;
      }

      &:last-of-type {
        border-right: var(--s-gray-100) 1px solid;
      }
    }

    td:first-of-type {
      font-weight: bold;
      border-left: var(--s-gray-100) 1px solid;
    }

    td:last-of-type {
      border-right: var(--s-gray-100) 1px solid;
    }
  }

  &:nth-of-type(n + 2) {
    margin-top: 48px;
  }
}

@media (prefers-color-scheme: dark) {
  .document-page {
    table {
      th,
      td {
        border-color: var(--s-gray-1100);
      }

      th {
        background-color: var(--s-gray-1100);

        &:first-of-type {
          border-color: var(--s-gray-1100);
        }

        &:last-of-type {
          border-color: var(--s-gray-1100);
        }
      }

      td:first-of-type {
        border-color: var(--s-gray-1100);
      }

      td:last-of-type {
        border-color: var(--s-gray-1100);
      }
    }
  }
}
</style>
