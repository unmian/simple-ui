<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:18:49
 * @Description: 密码强度文档
 * @FilePath: /simple-ui/documents/views/PasswordStrengthDocument.vue
-->
<template>
  <div class="password-strength-document">
    <document-page title="密码强度 SimplePasswordStrength" :code="code">
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
            <simple-input
              width="280px"
              type="password"
              v-model="password"
              placeholder="请输入测试密码"
              :maxlength="26"
            ></simple-input>
          </div>
          <div>
            <simple-password-strength :password="password"></simple-password-strength>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import { SimpleInputValue } from "packages";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      password: "" as SimpleInputValue,
      code: `
<template>
  <div>
    <div>
      <simple-input
        width="280px"
        type="password"
        v-model="password"
        placeholder="请输入测试密码"
        :maxlength="26"
      ></simple-input>
    </div>
    <div>
      <simple-password-strength
        :password="password"
      ></simple-password-strength>
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
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>