<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 16:09:31
 * @LastEditors: Quarter
 * @Description: 简易的表单项组件
 * @FilePath: /simple-ui/packages/form/src/form-item.vue
-->
<template>
  <div class="s-form-item" :class="customClass">
    <div class="form-label" v-if="!filterWithoutLabel">
      <div class="item-require">
        <span v-if="required">*</span>
      </div>
      <div class="item-label">{{ label }}</div>
    </div>
    <div class="form-content">
      <div class="item-content">
        <slot></slot>
      </div>
      <div v-if="error && message" class="item-message">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import SForm from "./form.vue";
import { Emitter } from "packages/mixins";
import { CustomClass, CommonPosition } from "packages/types";
import { Component, Inject, Prop } from "vue-property-decorator";
import { FormErrorDepot, CustomFormData, FormItemValue, FormRule, FormRules } from "./types";

@Component({
  name: "SFormItem",
})
export default class FormItem extends Emitter {
  /**
   * @description: 表单组件
   * @return {SForm|undefined}
   */
  @Inject({
    from: "SForm",
    default: undefined,
  })
  SForm?: InstanceType<typeof SForm>;

  @Prop(String)
  name?: string; // 数据名

  @Prop({
    type: String,
    default: "  ",
  })
  label!: string; // 标题

  @Prop({
    type: Boolean,
    default: false,
  })
  required!: boolean; // 是否必填

  @Prop(String)
  align?: CommonPosition; // 排列方式

  @Prop({
    type: Boolean,
    default: false,
  })
  withoutLabel!: boolean; // 不显示标签

  errorDepot: FormErrorDepot = {}; // 错误内容

  /**
   * @description: 过滤的不显示标签
   * @return {CustomFormData}
   */
  get filterWithoutLabel(): boolean {
    return this.withoutLabel !== false;
  }

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "align-left": this.align === "left",
      "align-right": this.align === "right",
      "align-top": this.align === "top",
      "without-label": this.filterWithoutLabel,
    };
  }

  /**
   * @description: 表单数据
   * @return {CustomFormData}
   */
  get formData(): CustomFormData {
    if (this.SForm && this.SForm.exposedData !== undefined) {
      return this.SForm.exposedData;
    }
    return {};
  }

  /**
   * @description: 表单规则
   * @return {FormRules}
   */
  get formRules(): FormRules {
    if (this.SForm && this.SForm.exposedRule !== undefined) {
      return this.SForm.exposedRule;
    }
    return {};
  }

  /**
   * @description: 验证规则
   * @return {Array<FormRule>}
   */
  get rules(): FormRule[] {
    if (
      typeof this.name === "string" &&
      this.formRules &&
      Array.isArray(this.formRules[this.name])
    ) {
      return this.formRules[this.name];
    }
    return [];
  }

  /**
   * @description: 表单数据
   * @return {FormItemValue}
   */
  get formItemData(): FormItemValue {
    if (
      typeof this.name === "string" &&
      typeof this.formData === "object" &&
      this.formData !== undefined &&
      this.formData[this.name] !== undefined
    ) {
      return this.formData[this.name];
    }
    return undefined;
  }

  /**
   * @description: 是否存在错误
   * @return {Boolean}
   */
  get error(): boolean {
    return Object.keys(this.errorDepot).length > 0;
  }

  /**
   * @description: 错误消息
   * @return {String}
   */
  get message(): string | undefined {
    if (Object.keys(this.errorDepot).length > 0) {
      return Object.values(this.errorDepot)[0];
    }
    return undefined;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    this.$on("s-form-validate", (eventName: string) => {
      this.validate(eventName);
    });
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    if (typeof this.name === "string" && this.name.length > 0) {
      this.dispatch("SForm", "register-form-item", [this]);
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    if (typeof this.name === "string" && this.name.length > 0) {
      this.dispatch("SForm", "destroy-form-item", [this]);
    }
  }

  /**
   * @description: 验证所有规则
   * @return
   */
  validateAll(): void {
    if (typeof this.name !== "string" || this.name.length === 0) {
      return;
    }
    if (!Array.isArray(this.rules)) {
      return;
    }
    const { rules } = this;
    rules.forEach((rule: FormRule, index: number) => {
      try {
        this.validateRule(rule);
        if (this.errorDepot[`rule-${index}`] !== undefined) {
          this.$delete(this.errorDepot, `rule-${index}`);
        }
      } catch (err) {
        if (err instanceof Error) {
          this.$set(this.errorDepot, `rule-${index}`, err.message);
        } else if (typeof err === "string") {
          this.$set(this.errorDepot, `rule-${index}`, err);
        }
        throw err;
      }
    });
  }

  /**
   * @description: 按照触发事件验证规则
   * @param {String} eventName 事件名称
   * @return
   */
  validate(eventName: string): void {
    if (typeof this.name !== "string" || this.name.length === 0) {
      return;
    }
    if (!Array.isArray(this.rules)) {
      return;
    }
    const { rules } = this;
    try {
      rules.forEach((rule: FormRule, index: number) => {
        if (rule.trigger === eventName) {
          try {
            this.validateRule(rule);
            if (this.errorDepot[`rule-${index}`] !== undefined) {
              Emitter.delete(this.errorDepot, `rule-${index}`);
            }
          } catch (err) {
            if (err instanceof Error) {
              Emitter.set(this.errorDepot, `rule-${index}`, err.message);
            } else if (typeof err === "string") {
              Emitter.set(this.errorDepot, `rule-${index}`, err);
            }
            throw err;
          }
        }
      });
    } catch (e) {
      // do something
    }
  }

  /**
   * @description: 验证规则
   * @param {FormRule} rule 待验证的规则
   * @return
   */
  validateRule(rule: FormRule): void {
    const value: FormItemValue = this.formItemData;
    if (rule) {
      if (rule.required === true) {
        if (value === undefined || value === null || value === "") {
          throw new Error(rule.message);
        }
        if (Array.isArray(value) && value.length === 0) {
          throw new Error(rule.message);
        }
      }
      if (value !== null && value !== undefined && value !== "") {
        if (typeof rule.type === "string") {
          const numberRegExp = new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/);
          switch (rule.type) {
            case "number":
              // eslint-disable-next-line max-depth
              if (numberRegExp.test(value.toString()) === false) {
                throw new Error(rule.message);
              }
              break;
            case "boolean":
              // eslint-disable-next-line max-depth
              if (value.toString() !== "true" || value.toString() !== "false") {
                throw new Error(rule.message);
              }
              break;
            default:
            //
          }
        }
        if (!Array.isArray(value) && rule.reg instanceof RegExp) {
          if (value.toString().length > 0 && rule.reg.test(value.toString()) === false) {
            throw new Error(rule.message);
          }
        }
      }
      if (typeof rule.validate === "function") {
        rule.validate(this.formItemData, this.formData);
      }
    }
  }
}
</script>

<style lang="scss">
.s-form-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  .form-label {
    min-height: 36px;
    font-size: 14px;
    white-space: pre-wrap;
    display: flex;
    align-items: center;

    .item-require {
      width: 12px;
      font-size: 20px;
      color: #f56c6c;
      margin-right: 3px;
    }
  }

  .form-content .item-content {
    min-height: 35px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .item-message {
    padding: 5px 0;
    color: #f56c6c;
    font-size: 12px;
  }

  &:not(:first-of-type) {
    margin-top: 15px;

    &.align-top {
      margin-top: 25px;
    }
  }

  &.align-top {
    .form-label {
      width: 100% !important;
      text-align: initial !important;
      justify-content: initial !important;
    }

    .form-content {
      width: 100% !important;
      margin-top: 10px !important;
    }
  }

  &.align-left,
  &.align-right {
    .form-label {
      width: var(--label-width, 120px) !important;
      padding-right: 10px !important;
      box-sizing: border-box !important;
    }

    .form-content {
      width: var(--content-width, calc(100% - 120px)) !important;
    }
  }

  &.align-right .form-label {
    text-align: right !important;
    justify-content: flex-end !important;
  }

  &.without-label {
    .form-label {
      display: none !important;
    }

    .form-content {
      width: 100% !important;
    }
  }

  &.status-error {
    .s-input,
    .s-input.status-focused {
      background-color: rgba($color: #f56c6c, $alpha: 0.05);

      .input-content {
        border-color: #f56c6c;
      }
    }

    .s-select .select-input {
      border-color: #f56c6c;
      background-color: rgba($color: #f56c6c, $alpha: 0.05);
    }

    .s-textarea,
    .s-textarea.status-focused {
      background-color: rgba($color: #f56c6c, $alpha: 0.05);

      .textarea-content {
        border-color: #f56c6c;
      }
    }
  }
}
</style>
