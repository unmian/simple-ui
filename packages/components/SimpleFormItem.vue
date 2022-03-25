<!--
 * @Author: Quarter
 * @Date: 2020-07-23 19:38:38
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:10:20
 * @Description: 简易的表单项
--> 
<template>
  <div class="simple-form-item" :class="customClass">
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
import { Emitter } from "../mixins";
import SimpleForm from "./SimpleForm.vue";
import {
  SimpleCustomClass,
  SimpleErrorDepot,
  SimpleFormData,
  SimpleFormItemValue,
  SimpleFormRule,
  SimpleFormRules,
  SimplePosition,
} from "../types";
import { PropOptions } from "vue";

export default Emitter.extend({
  name: "SimpleFormItem",
  inject: {
    SimpleForm: {
      from: "SimpleForm",
      default: undefined,
    },
  },
  props: {
    name: String, // 数据名
    label: { // 标题
      type: String,
      default: "  ",
    },
    required: { // 是否必填
      type: Boolean,
      default: false,
    },
    align: String as PropOptions<SimplePosition | undefined>, // 排列方式
    withoutLabel: { // 不显示标签
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errorDepot: {} as SimpleErrorDepot, // 错误内容
    };
  },
  computed: {
    /**
     * @description: 表单组件
     * @author: Quarter
     * @return {SimpleForm|undefined}
     */
    simpleForm(): any {
      return (this as any).SimpleForm;
    },
    /**
     * @description: 过滤的不显示标签
     * @author: Quarter
     * @return {SimpleFormData}
     */
    filterWithoutLabel(): boolean {
      return this.withoutLabel !== false;
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "align-left": this.align === "left",
        "align-right": this.align === "right",
        "align-top": this.align === "top",
        "without-label": this.filterWithoutLabel,
      };
    },
    /**
     * @description: 表单数据
     * @author: Quarter
     * @return {SimpleFormData}
     */
    formData(): SimpleFormData {
      if (this.simpleForm && this.simpleForm.exposedData !== undefined) {
        return this.simpleForm.exposedData;
      }
      return {};
    },
    /**
     * @description: 表单规则
     * @author: Quarter
     * @return {SimpleFormRules}
     */
    formRules(): SimpleFormRules {
      if (this.simpleForm && this.simpleForm.exposedRule !== undefined) {
        return this.simpleForm.exposedRule;
      }
      return {};
    },
    /**
     * @description: 验证规则
     * @author: Quarter
     * @return {Array<SimpleFormRule>}
     */
    rules(): SimpleFormRule[] {
      if (
        typeof this.name === "string" &&
        this.formRules &&
        Array.isArray(this.formRules[this.name])
      ) {
        return this.formRules[this.name];
      }
      return [];
    },
    /**
     * @description: 表单数据
     * @author: Quarter
     * @return {SimpleFormItemValue}
     */
    formItemData(): SimpleFormItemValue {
      if (
        typeof this.name === "string" &&
        typeof this.formData === "object" &&
        this.formData !== undefined &&
        this.formData[this.name] !== undefined
      ) {
        return this.formData[this.name];
      }
      return undefined;
    },
    /**
     * @description: 是否存在错误
     * @author: Quarter
     * @return {Boolean}
     */
    error(): boolean {
      return Object.keys(this.errorDepot).length > 0;
    },
    /**
     * @description: 错误消息
     * @author: Quarter
     * @return {String}
     */
    message(): string | undefined {
      if (Object.keys(this.errorDepot).length > 0) {
        return Object.values(this.errorDepot)[0];
      }
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.$on("simple-form-validate", (eventName: string) => {
      this.validate(eventName);
    });
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    if (typeof this.name === "string" && this.name.length > 0) {
      this.dispatch("SimpleForm", "register-form-item", [this]);
    }
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestroy(): void {
    if (typeof this.name === "string" && this.name.length > 0) {
      this.dispatch("SimpleForm", "destroy-form-item", [this]);
    }
  },
  methods: {
    /**
     * @description: 验证所有规则
     * @author: Quarter
     * @return
     */
    validateAll(): void {
      if (typeof this.name !== "string" || this.name.length === 0) {
        return;
      }
      if (!Array.isArray(this.rules)) {
        return;
      }
      const rules: SimpleFormRule[] = this.rules;
      rules.forEach((rule: SimpleFormRule, index: number) => {
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
      });
    },
    /**
     * @description: 按照触发事件验证规则
     * @author: Quarter
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
      const rules: SimpleFormRule[] = this.rules;
      try {
        rules.forEach((rule: SimpleFormRule, index: number) => {
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
        // tslint:disable-next-line
      } catch { }
    },
    /**
     * @description: 验证规则
     * @author: Quarter
     * @param {FormRule} rule 待验证的规则
     * @return
     */
    validateRule(rule: SimpleFormRule): void {
      const value: SimpleFormItemValue = this.formItemData;
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
            switch (rule.type) {
              case "number":
                const numberRegExp: RegExp = new RegExp(
                  /^[0-9]+(\.[0-9]+){0,1}$/
                );
                if (numberRegExp.test(value.toString()) === false) {
                  throw new Error(rule.message);
                }
                break;
              case "boolean":
                if (value.toString() !== "true" || value.toString() !== "false") {
                  throw new Error(rule.message);
                }
                break;
            }
          }
          if (!Array.isArray(value) && rule.reg instanceof RegExp) {
            if (
              value.toString().length > 0 &&
              rule.reg.test(value.toString()) === false
            ) {
              throw new Error(rule.message);
            }
          }
        }
        if (typeof rule.validate === "function") {
          rule.validate(this.formItemData, this.formData);
        }
      }
    },
  },
});
</script>

<style lang="scss">
.simple-form-item {
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
    .simple-input,
    .simple-input.status-focused {
      background-color: rgba($color: #f56c6c, $alpha: 0.05);

      .input-content {
        border-color: #f56c6c;
      }
    }

    .simple-select .select-input {
      border-color: #f56c6c;
      background-color: rgba($color: #f56c6c, $alpha: 0.05);
    }

    .simple-textarea,
    .simple-textarea.status-focused {
      background-color: rgba($color: #f56c6c, $alpha: 0.05);

      .textarea-content {
        border-color: #f56c6c;
      }
    }
  }
}
</style>