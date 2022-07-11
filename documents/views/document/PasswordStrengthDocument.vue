<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:00:22
 * @Description: 密码强度文档
 * @FilePath: /simple-ui/documents/views/PasswordStrengthDocument.vue
-->
<template>
  <div class="password-strength-document">
    <document-page title="密码强度 PasswordStrength" :code="code">
      <template v-slot:desc>
        <p>这是一个用于检测密码强度的组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>password</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>待检测的密码</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <div>
            <s-input width="280px" type="password" v-model="password" placeholder="请输入测试密码" :maxlength="26"></s-input>
          </div>
          <div>
            <s-password-strength :password="password"></s-password-strength>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { InputValue } from "@quarter/simple-ui";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PasswordStrengthDocument",
  components: {
    DocumentPage,
  },
})
export default class PasswordStrengthDocument extends Vue {
  password: InputValue = "";
  code = `
<template>
  <div>
    <div>
      <s-input
        width="280px"
        type="password"
        v-model="password"
        placeholder="请输入测试密码"
        :maxlength="26"
      ></s-input>
    </div>
    <div>
      <s-password-strength
        :password="password"
      ></s-password-strength>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PasswordStrengthDocument extends Vue {
  // 密码
  private password: InputValue = "";
}
</${"script"}>
  `;
}
</script>

<style lang="scss" scoped>
</style>