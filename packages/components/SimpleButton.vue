<!--
 * @Author: Quarter
 * @Date: 2020-09-29 15:32:55
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:23:38
 * @Description: 简易的按钮组件
 * @FilePath: /simple-ui/packages/components/SimpleButton.vue
-->
<template>
  <button class="simple-button" :class="buttonClass" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleButtonType, SimpleCustomClass, SimpleSize } from "../types";

export default Vue.extend({
  name: "SimpleButton",
  props: {
    fill: { // 是否填充
      type: Boolean,
      default: false,
    },
    outline: { // 是否框线
      type: Boolean,
      default: false,
    },
    size: { // 按钮大小
      type: String,
      default: "medium",
    } as PropOptions<SimpleSize>,
    type: { // 按钮类型
      type: String,
      default: "normal",
    } as PropOptions<SimpleButtonType>,
    round: { // 圆角按钮
      type: Boolean,
      default: false,
    },
    disabled: { // 按钮类型
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * @description: 按钮类
     * @author: Quarter
     * @param {type}
     * @return {type}
     */
    buttonClass(): SimpleCustomClass {
      return {
        "fill-button": this.fill,
        "outline-button": this.outline,
        "normal-button": this.type === "normal",
        "cancel-button": this.type === "cancel",
        "confirm-button": this.type === "confirm",
        "success-button": this.type === "success",
        "warning-button": this.type === "warning",
        "danger-button": this.type === "danger",
        "linear-button": this.type === "linear",
        "size-mini": this.size === "mini",
        "size-small": this.size === "small",
        "size-medium": this.size === "medium",
        "size-large": this.size === "large",
        "round-button": this.round,
      };
    },
  },
  methods: {
    /**
     * @description: 点击事件
     * @author: Quarter
     * @param {MouseEvent} event 事件
     * @return
     */
    handleClick(event: MouseEvent): void {
      if (this.disabled === false) {
        this.$emit("click", event);
      }
    },
  },
});
</script>

<style lang="scss">
button.simple-button {
  line-height: 1;
  border: none;
  cursor: pointer;
  background: none;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  img,
  i {
    margin-right: 10px;
  }

  &[disabled] {
    cursor: not-allowed;
  }

  &.size-mini {
    height: 24px;
    min-width: 24px;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 2px;

    &.round-button {
      border-radius: 12px;
    }
  }

  &.size-small {
    height: 30px;
    min-width: 30px;
    padding: 0 10px;
    font-size: 14px;
    border-radius: 4px;

    &.round-button {
      border-radius: 15px;
    }
  }

  &.size-medium {
    height: 34px;
    min-width: 34px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;

    &.round-button {
      border-radius: 17px;
    }
  }

  &.size-large {
    height: 40px;
    min-width: 40px;
    padding: 0 18px;
    font-size: 16px;
    border-radius: 5px;

    &.round-button {
      border-radius: 20px;
    }
  }

  // 取消按钮
  &.cancel-button {
    color: rgba($color: #000000, $alpha: 0.55);

    &:not([disabled]):hover {
      color: rgba($color: #000000, $alpha: 0.65);
    }

    &.outline-button {
      color: rgba($color: #000000, $alpha: 0.55);
      border: 1px solid #d9d9d9;

      &:not([disabled]):hover {
        color: rgba($color: #000000, $alpha: 0.65);
        border-color: #a8a8a8;
      }
    }

    &.fill-button {
      color: rgba($color: #000000, $alpha: 0.55);
      background-color: #f3f3f3;

      &:not([disabled]):hover {
        color: rgba($color: #000000, $alpha: 0.65);
        border-color: #f0f0f0;
      }
    }

    &[disabled] {
      color: rgba($color: #000000, $alpha: 0.3);

      &.outline-button {
        color: rgba($color: #000000, $alpha: 0.3);
        border-color: rgba($color: #d6e1e5, $alpha: 0.5);
        background-color: #fafafa;
      }

      &.fill-button {
        color: rgba($color: #000000, $alpha: 0.4);
        background-color: #f0f0f0;
      }
    }
  }

  // 正常按钮
  &.normal-button {
    color: #666666;

    &:not([disabled]):hover {
      color: #549fff;
    }

    &.outline-button {
      color: rgba($color: #000000, $alpha: 0.65);
      border: 1px solid #d6e1e5;

      &:not([disabled]):hover {
        color: #549fff;
        border-color: #549fff;
      }
    }

    &.fill-button {
      color: rgba($color: #000000, $alpha: 0.65);
      border: 1px solid #d6e1e5;
      background-color: #ffffff;

      &:not([disabled]):hover {
        color: #549fff;
        border-color: #549fff;
      }
    }

    &[disabled] {
      color: rgba($color: #000000, $alpha: 0.3);

      &.outline-button {
        color: rgba($color: #000000, $alpha: 0.3);
        border-color: rgba($color: #d6e1e5, $alpha: 0.5);
        background-color: #fafafa;
      }

      &.fill-button {
        color: rgba($color: #000000, $alpha: 0.5);
        border: none;
        background-color: #f5f5f5;
      }
    }
  }

  // 确认按钮
  &.confirm-button {
    color: #549fff;

    &:not([disabled]):hover {
      color: #0079fe;
    }

    &.outline-button {
      color: #549fff;
      border: 1px solid #549fff;

      &:not([disabled]):hover {
        color: #0079fe;
        border-color: #0079fe;
      }
    }

    &.fill-button {
      color: #ffffff;
      background-color: #549fff;

      &:not([disabled]):hover {
        color: #ffffff;
        background-color: #0079fe;
      }
    }

    &[disabled] {
      color: rgba($color: #0079fe, $alpha: 0.5);

      &.outline-button {
        color: rgba($color: #0079fe, $alpha: 0.6);
        border-color: rgba($color: #0079fe, $alpha: 0.2);
      }

      &.fill-button {
        color: rgba($color: #0079fe, $alpha: 0.6);
        border: none;
        background-color: rgba($color: #0079fe, $alpha: 0.05);
      }
    }
  }

  // 成功按钮
  &.success-button {
    color: #1dbb4c;

    &:not([disabled]):hover {
      color: #14a840;
    }

    &.outline-button {
      color: #1dbb4c;
      border: 1px solid #1dbb4c;

      &:not([disabled]):hover {
        color: #14a840;
        border-color: #14a840;
      }
    }

    &.fill-button {
      color: #ffffff;
      background-color: #1dbb4c;

      &:not([disabled]):hover {
        color: #ffffff;
        background-color: #14a840;
      }
    }

    &[disabled] {
      color: rgba($color: #1dbb4c, $alpha: 0.5);

      &.outline-button {
        color: rgba($color: #1dbb4c, $alpha: 0.6);
        border-color: rgba($color: #1dbb4c, $alpha: 0.2);
      }

      &.fill-button {
        color: rgba($color: #1dbb4c, $alpha: 0.6);
        border: none;
        background-color: rgba($color: #1dbb4c, $alpha: 0.05);
      }
    }
  }

  // 警告按钮
  &.warning-button {
    color: #f39831;

    &:not([disabled]):hover {
      color: #eb902a;
    }

    &.outline-button {
      color: #f39831;
      border: 1px solid #f39831;

      &:not([disabled]):hover {
        color: #eb902a;
        border-color: #eb902a;
      }
    }

    &.fill-button {
      color: #ffffff;
      background-color: #f39831;

      &:not([disabled]):hover {
        color: #ffffff;
        background-color: #eb902a;
      }
    }

    &[disabled] {
      color: rgba($color: #f39831, $alpha: 0.5);

      &.outline-button {
        color: rgba($color: #f39831, $alpha: 0.6);
        border-color: rgba($color: #f39831, $alpha: 0.2);
      }

      &.fill-button {
        color: rgba($color: #f39831, $alpha: 0.6);
        border: none;
        background-color: rgba($color: #f39831, $alpha: 0.05);
      }
    }
  }

  // 危险按钮
  &.danger-button {
    color: #f04134;

    &:not([disabled]):hover {
      color: #fa4a4a;
    }

    &.outline-button {
      color: #f04134;
      border: 1px solid #f04134;

      &:not([disabled]):hover {
        color: #fa4a4a;
        border-color: #fa4a4a;
      }
    }

    &.fill-button {
      color: #ffffff;
      background-color: #f04134;

      &:not([disabled]):hover {
        color: #ffffff;
        background-color: #fa4a4a;
      }
    }

    &[disabled] {
      color: rgba($color: #f04134, $alpha: 0.5);

      &.outline-button {
        color: rgba($color: #f04134, $alpha: 0.6);
        border-color: rgba($color: #f04134, $alpha: 0.2);
      }

      &.fill-button {
        color: rgba($color: #f04134, $alpha: 0.6);
        border: none;
        background-color: rgba($color: #f04134, $alpha: 0.05);
      }
    }
  }

  // 渐变按钮
  &.linear-button {
    &.fill-button {
      color: #ffffff;
      background-image: linear-gradient(
        223deg,
        rgba(113, 91, 250, 1) 0%,
        rgba(21, 124, 236, 1) 100%
      );
    }

    &[disabled] {
      &.fill-button {
        background-image: linear-gradient(
          223deg,
          rgb(181, 170, 250) 0%,
          rgb(172, 209, 248) 100%
        );
      }
    }
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>