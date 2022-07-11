<!--
 * @Author: Quarter
 * @Date: 2022-06-09 11:50:44
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-07 17:21:44
 * @FilePath: /simple-ui/documents/components/color-block/index.vue
 * @Description: 颜色
-->
<template>
  <li class="color-block" :class="customClass" :style="customStyle" @click="handleClick">
    <span class="left-part">
      <span>{{ level }}</span>
      <span class="semantic-name">{{ name }}</span>
    </span>
    <span class="right-part">{{ colorStr }}</span>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CustomClass, CustomStyle } from "@quarter/simple-ui";

@Component({
  name: "filterColorBlock",
})
export default class filterColorBlock extends Vue {
  @Prop({
    type: String,
    default: "#0052d9",
  })
  code!: string; // 颜色代码

  @Prop(String)
  color!: string; // 颜色

  @Prop({
    type: Number,
    default: 1,
  })
  opacity!: number; // 透明度

  @Prop(String)
  theme?: string; // 主题

  @Prop(String)
  name?: object; // 语意化命名

  @Prop({
    type: String,
    default: "dark",
  })
  mode!: string; // 文字模式

  @Prop({
    type: Number,
    default: 50,
  })
  level!: number; // 颜色级别

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "light-theme": this.mode === "light",
      "dark-theme": this.mode === "dark",
    };
  }

  /**
   * @description: 过滤的颜色
   * @return {string}
   */
  get filterColor(): string {
    if (this.opacity === 1) {
      return this.code;
    }
    const red = parseInt(this.code.substring(1, 3), 16);
    const green = parseInt(this.code.substring(3, 5), 16);
    const blue = parseInt(this.code.substring(5, 7), 16);
    return `rgba(${red}, ${green}, ${blue}, ${this.opacity})`;
  }

  /**
   * @description: 颜色字符串
   * @return {string}
   */
  get colorStr(): string {
    if (this.opacity === 1) {
      return this.code;
    }
    return `${this.code} ${Math.round(this.opacity * 100)}%`;
  }

  /**
   * @description: 自定义样式
   * @author: Quarter
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    return {
      backgroundColor: this.filterColor,
    };
  }

  /**
   * @description: CSS 变量名
   * @return {string}
   */
  get styleName(): string {
    if (this.theme && this.name) {
      return `--s-${this.theme}-${this.name}`.toLocaleLowerCase();
    }
    return `--s-${this.color}-${this.level}`.toLocaleLowerCase();
  }

  /**
   * @description: 处理元素点击事件
   * @return
   */
  handleClick(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.styleName);
      this.$message.success(`CSS 变量复制成功 【${this.styleName}】`);
    }
  }
}
</script>

<style lang="scss">
.color-block {
  width: 100%;
  height: 64px;
  padding: var(--s-spacing-8);
  cursor: pointer;
  box-sizing: border-box;
  background-color: red;
  transition: all 0.2s linear;
  display: inline-flex;
  justify-content: space-between;
}

.dark-theme {
  color: var(--s-font-white-400);
}

.light-theme {
  color: var(--s-font-gray-400);
}

.left-part {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
}

.semantic-name {
  font-size: var(--s-font-4);
}
</style>
