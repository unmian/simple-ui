<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 17:12:39
 * @LastEditors: Quarter
 * @Description: 简易的标签组件
 * @FilePath: /simple-ui/packages/tag/src/tag.vue
-->
<template>
  <div class="s-tag" :class="`s-tag--size-${filterSize}`">
    <span>
      <slot></slot>
    </span>
    <button v-if="showClose" class="s-tag__close-btn" @click.stop="handleClose">
      <icon name="close-md"></icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { CommonSize, CommonThemeMode } from "packages/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "STag",
  components: {
    Icon,
  },
})
export default class Tag extends Vue {
  @Prop({
    type: String,
    default: "dark",
  })
  mode?: CommonThemeMode; // 主题模式

  @Prop(String)
  size?: CommonSize; // 标签大小

  @Prop({
    type: Boolean,
    default: false,
  })
  showClose?: boolean; // 是否显示关闭

  @Prop({
    type: Boolean,
    default: false,
  })
  external?: boolean; // 是否外部控制

  /**
   * @description: 筛选的尺寸
   * @return {CommonSize}
   */
  get filterSize(): CommonSize {
    const sizeList: CommonSize[] = ["mini", "small", "medium", "large"];
    if (this.size && sizeList.includes(this.size)) {
      return this.size;
    }
    return "medium";
  }

  /**
   * @description: 关闭按钮
   * @return
   */
  handleClose(): void {
    this.$emit("close");
    if (this.external === false) {
      this.$nextTick(() => this.$destroy());
      this.$el.parentNode?.removeChild(this.$el);
    }
  }
}
</script>

<style lang="scss">
.s-tag {
  color: var(--s-text-primary);
  border-radius: var(--s-border-radius);
  background-color: var(--s-background-secondary);
  display: inline-flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: var(--s-spacing-8);
  }
}

.s-tag__close-btn {
  color: var(--s-text-placeholder);
  font-size: inherit;
  cursor: pointer;
  border: none;
  background: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: var(--s-spacing-4);

  &:hover {
    color: var(--s-brand-hover);
  }
}

.s-tag--size-mini {
  height: 1.8rem;
  padding: 0 var(--s-spacing-4);
  font-size: 1.2rem;
  border-radius: 2px;

  button {
    padding: 0;
    margin-left: var(--s-spacing-4);
  }
}

.s-tag--size-small {
  height: 2.2rem;
  padding: 0 var(--s-spacing-8);
  font-size: 1.2rem;

  button {
    padding: 0;
    margin-left: var(--s-spacing-4);
  }
}

.s-tag--size-medium {
  height: 2.4rem;
  padding: 0 var(--s-spacing-8);
  font-size: 1.4rem;

  button {
    padding: 0.2rem;
    margin-left: var(--s-spacing-4);
  }
}

.s-tag--size-large {
  height: 2.6rem;
  padding: 0 var(--s-spacing-12);
  font-size: 1.6rem;

  button {
    padding: 0.2rem;
    margin-left: var(--s-spacing-4);
  }
}
</style>
