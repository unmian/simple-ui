<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-15 16:24:03
 * @LastEditors: Quarter
 * @Description: 复选框组件
 * @FilePath: /simple-ui/packages/checkbox/src/checkbox.vue
-->
<template>
  <div class="s-checkbox" :class="customClass" @click="handleCheck">
    <div class="s-checkbox__symbol">
      <div class="s-checkbox__inactive-symbol"></div>
      <div class="s-checkbox__active-symbol">
        <icon name="check"></icon>
      </div>
    </div>
    <div v-if="hasSlot" class="s-checkbox__label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Emitter } from "packages/mixins";
import { CustomClass } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import { CheckboxValue } from "./types";

@Component({
  name: "SCheckbox",
  components: {
    Icon,
  },
})
export default class Checkbox extends Emitter {
  // 复选框的值
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  readonly label!: CheckboxValue;

  // 单个使用的时候是否选中
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly checked!: boolean;

  // 是否禁用点击事件
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled?: boolean;

  // 是否受控
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly alone!: boolean;

  // 是否只读
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly readonly!: boolean;

  // 被选中状态
  checkStatus = false;
  // 复选框组的值
  CheckboxValue: CheckboxValue[] = [];

  /**
   * @description: 单个使用的时候是否选中
   * @return {boolean}
   */
  get syncedChecked(): boolean {
    return this.checked;
  }

  /**
   * @description: 单个使用的时候是否选中
   * @param {boolean} val 值
   * @return
   */
  set syncedChecked(val: boolean) {
    this.$emit("update:checked", val);
  }

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "s-checkbox--checked": this.checkStatus === true,
      "s-checkbox--disabled": this.disabled === true,
      "s-checkbox--readonly": this.readonly === true,
    };
  }

  /**
   * @description: 是否有插槽内容
   * @return {Boolean}
   */
  get hasSlot(): boolean {
    return !!this.$slots.default;
  }

  /**
   * @description: 是否可用
   * @return
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    if (
      this.CheckboxValue !== undefined &&
      typeof this.syncedChecked === "boolean" &&
      this.checkStatus !== this.syncedChecked
    ) {
      this.checkStatus = this.syncedChecked;
    }
    if (this.alone === false) {
      this.$on("s-checkbox-changed", (value?: CheckboxValue[]) => {
        if (Array.isArray(value)) {
          this.CheckboxValue = value;
        }
      });
      this.dispatch("SCheckboxGroup", "s-checkbox-register", [this.registerCheckbox]);
    }
  }

  /**
   * @description: 监听选中变化
   * @param {Boolean} newValue 变化的值
   * @return
   */
  @Watch("checked", {
    immediate: true,
  })
  handleCheckedChange(newValue: boolean): void {
    if (typeof newValue === "boolean" && this.checkStatus !== newValue) {
      this.checkStatus = newValue;
    }
  }

  /**
   * @description: 监听值的变化
   * @return
   */
  @Watch("label", {
    immediate: true,
  })
  handleLabelChange(): void {
    if (Array.isArray(this.CheckboxValue) && this.alone === false) {
      if (typeof this.label === "string" || typeof this.label === "number" || this.label === null) {
        if (this.CheckboxValue.indexOf(this.label) === -1) {
          this.checkStatus = false;
        } else {
          this.checkStatus = true;
        }
      }
    }
  }

  /**
   * @description: 更新复选框状态
   * @param {type} newValue 改变的值
   * @return
   */
  @Watch("CheckboxValue", {
    immediate: true,
  })
  handleCheckboxValueChange(newValue?: CheckboxValue[]): void {
    if (Array.isArray(newValue) && this.alone === false) {
      if (typeof this.label === "string" || typeof this.label === "number" || this.label === null) {
        if (newValue.indexOf(this.label) === -1) {
          this.checkStatus = false;
        } else {
          this.checkStatus = true;
        }
      }
    }
  }

  /**
   * @description: 注册复选框组
   * @param {Array<CheckboxValue>} value 选中的值
   * @return
   */
  registerCheckbox(value?: CheckboxValue[]): void {
    if (Array.isArray(value)) {
      this.CheckboxValue = value;
      if (this.label !== undefined && this.CheckboxValue.indexOf(this.label) > -1) {
        this.syncedChecked = true;
      }
    }
  }

  /**
   * @description: 切换选中状态
   * @return
   */
   handleCheck(event?: MouseEvent | boolean): void {
    if (this.enabled) {
      const checkStatus = !this.checkStatus;
      if (this.alone === false) {
        this.syncedChecked = checkStatus;
        this.$emit("change", checkStatus, this.label);
        if (event !== false) {
          if (checkStatus) {
            this.$emit("check", this.label);
          } else {
            this.$emit("uncheck", this.label);
          }
        }
        if (
          this.label !== undefined &&
          (this.label === null || typeof this.label === "string" || typeof this.label === "number")
        ) {
          if (checkStatus === true) {
            this.dispatch("SCheckboxGroup", "s-checkbox-checked", [this.label]);
          } else {
            this.dispatch("SCheckboxGroup", "s-checkbox-dischecked", [this.label]);
          }
        }
        this.checkStatus = checkStatus;
      } else {
        this.$emit("trigger", this.label, this.checkStatus);
      }
    }
  }
}
</script>

<style lang="scss">
.s-checkbox {
  color: var(--s-text-primary);
  font-size: 1.4rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: var(--s-spacing-16);
}

.s-checkbox__symbol {
  width: 1.6rem;
  height: 1.6rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.s-checkbox__inactive-symbol,
.s-checkbox__active-symbol {
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  border-radius: var(--s-border-radius);
  box-sizing: border-box;
  transition: transform 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.s-checkbox__inactive-symbol {
  border: 1px solid var(--s-border-color);
  background-color: var(--s-background-primary);
  transform: scale(1);
}

.s-checkbox__active-symbol {
  color: var(--s-text-white);
  background-color: var(--s-brand-normal);
  transform: scale(0);
}

.s-checkbox__label {
  color: inherit;
  font-size: inherit;
  margin-left: var(--s-spacing-12);
}

.s-checkbox--checked {
  color: var(--s-brand-normal);

  .s-checkbox__active-symbol {
    transform: scale(1);
  }
}

.s-checkbox--disabled {
  color: var(--s-text-disabled);
  cursor: not-allowed;

  .s-checkbox__inactive-symbol {
    background-color: var(--s-background-disabled);
  }
  .s-checkbox__active-symbol {
    background-color: var(--s-brand-disabled);
  }

  &.s-checkbox--checked {
   color: var(--s-brand-disabled);
  }
}

.s-checkbox--readonly:not(.s-checkbox--disabled) {
  cursor: default;

  .s-checkbox__inactive-symbol {
    background-color: var(--s-background-secondary);
  }
}
</style>
