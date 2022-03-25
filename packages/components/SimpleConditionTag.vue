<!--
 * @Author: Quarter
 * @Date: 2020-07-16 08:55:33
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:03:28
 * @Description: 条件筛选用的标签
--> 
<template>
  <div class="simple-condition-tag">
    <div class="condition-label">
      <slot></slot>
    </div>
    <div class="condition-close" @click="closeTag">
      <i class="simple-icon-close"></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode, PropOptions } from "vue";
import { SimpleTagValue } from "../types";

export default Vue.extend({
  name: "SimpleConditionTag",
  props: {
    value: { // 标签的值
      default: null,
    } as PropOptions<SimpleTagValue>,
  },
  methods: {
    /**
     * @description: 关闭标签
     * @author: Quarter
     * @return
     */
    closeTag(): void {
      let label: string | null = null;
      const defaultNodes: VNode[] | undefined = this.$slots.default;
      if (defaultNodes && defaultNodes.length > 0) {
        const firstNode: VNode = defaultNodes[0];
        if (firstNode.text) {
          label = firstNode.text;
        }
      }
      this.$emit("close", label);
      this.$nextTick(() => {
        this.$destroy(); // 销毁自身
        this.$el.parentNode?.removeChild(this.$el);
      });
    },
  },
});
</script>

<style lang="scss">
.simple-condition-tag {
  padding: 2px 8px;
  color: #666666;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #d6e1e5;
  cursor: default;
  background-color: #ffffff;
  display: inline-flex;
  align-items: center;

  .condition-close {
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      color: #1677ff;
      font-weight: bolder;
      transform: scale(1.3);
    }
  }

  &:not(:first-of-type) {
    margin-left: 10px;
  }
}
</style>