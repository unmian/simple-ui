<!--
 * @Author: Quarter
 * @Date: 2022-07-07 19:28:37
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:31:31
 * @FilePath: /simple-ui/documents/views/document/button/demo.vue
 * @Description: 按钮示例文件
-->
<template>
  <div class="button-demo">
    <div>
      <s-form>
        <s-form-item label="按钮变体：">
          <s-radio v-model="buttonVariant" label="plain">文本</s-radio>
          <s-radio v-model="buttonVariant" label="fill">填充</s-radio>
          <s-radio v-model="buttonVariant" label="outline">描边</s-radio>
          <s-radio v-model="buttonVariant" label="outline-dashed">虚线描边</s-radio>
        </s-form-item>
        <s-form-item label="按钮尺寸：">
          <s-radio v-model="buttonSize" label="small">小尺寸</s-radio>
          <s-radio v-model="buttonSize" label="medium">中尺寸</s-radio>
          <s-radio v-model="buttonSize" label="large">大尺寸</s-radio>
        </s-form-item>
        <s-form-item label="按钮形态：">
          <s-radio v-model="buttonShape" label="rectangle">矩形</s-radio>
          <s-radio v-model="buttonShape" label="square">方形</s-radio>
          <s-radio v-model="buttonShape" label="round">圆角</s-radio>
          <s-radio v-model="buttonShape" label="circle">圆形</s-radio>
        </s-form-item>
        <s-form-item label="按钮状态：">
          <s-radio v-model="buttonDisabled" :label="false">启用</s-radio>
          <s-radio v-model="buttonDisabled" :label="true">禁用</s-radio>
        </s-form-item>
      </s-form>
    </div>
    <ul>
      <li>
        <s-button
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >普通</s-button
        >
        <s-button
          theme="primary"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >确认</s-button
        >
        <s-button
          theme="success"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >成功</s-button
        >
        <s-button
          theme="warning"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >警告</s-button
        >
        <s-button
          theme="danger"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >危险</s-button
        >
        <s-button
          theme="cancel"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >取消</s-button
        >
      </li>
      <li>
        <s-button
          theme="primary"
          icon="download"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
          >普通</s-button
        >
        <s-button
          theme="primary"
          icon="download"
          :variant="buttonVariant"
          :size="buttonSize"
          :shape="buttonShape"
          :disabled="buttonDisabled"
        ></s-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ButtonShape, ButtonSize, ButtonVariant } from "@unmian/simple-ui";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ButtonDemo extends Vue {
  // 按钮变体
  buttonVariant: ButtonVariant = "fill";
  // 按钮尺寸
  buttonSize: ButtonSize = "medium";
  // 按钮形态
  buttonShape: ButtonShape = "rectangle";
  // 按钮状态
  buttonDisabled = false;
}
</script>

<style lang="scss" scoped>
.button-demo {
  ul {
    padding: 0;
    list-style: none;
    margin: var(--s-spacing-48) 0 0 0;

    li:nth-of-type(n + 2) {
      margin-top: 20px;
    }
  }
}
</style>
