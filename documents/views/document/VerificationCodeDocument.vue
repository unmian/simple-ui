<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:29:46
 * @Description: 图形验证码文档
 * @FilePath: /simple-ui/documents/views/document/VerificationCodeDocument.vue
-->
<template>
  <div class="verification-code-document">
    <document-page title="图形验证码 VerificationCode" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的前端显示图形验证码的组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>100px</td>
            <td>-</td>
            <td>画布的宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>40px</td>
            <td>-</td>
            <td>画布的高度</td>
          </tr>
          <tr>
            <td>length</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>4</td>
            <td>-</td>
            <td>验证码的长度</td>
          </tr>
          <tr>
            <td>strict</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>-</td>
            <td>是否严格检查大小写</td>
          </tr>
          <tr>
            <td>lines</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>3</td>
            <td>-</td>
            <td>干扰线的个数</td>
          </tr>
          <tr>
            <td>points</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>20</td>
            <td>-</td>
            <td>干扰点的个数</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>generate</td>
            <td>-</td>
            <td>-</td>
            <td>重新生成验证码</td>
          </tr>
          <tr>
            <td>validate</td>
            <td>code: String 待验证的内容</td>
            <td>Promise&lt;void&gt;</td>
            <td>验证</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-input
            width="150px"
            v-model="verificationCode"
            placeholder="请输入验证码"
            :maxlength="4"
          ></s-input>
          <s-verification-code
            ref="verificationCode"
            style="margin-left: 20px"
          ></s-verification-code>
          <s-button outline type="normal" @click="verifyCode" style="margin-left: 20px"
            >验证</s-button
          >
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { MessageCommand, VerificationCode } from "@unmian/simple-ui";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "VerificationCodeDocument",
  components: {
    DocumentPage,
  },
})
export default class VerificationCodeDocument extends Vue {
  verificationCode = ""; // 验证码
  code = `
<template v-slot:example>
  <s-input
    width="150px"
    v-model="verificationCode"
    placeholder="请输入验证码"
    :maxlength="4"
  ></s-input>
  <s-verification-code
    ref="verificationCode"
    style="margin-left: 20px"
  ></s-verification-code>
  <s-button
    outline
    type="normal"
    @click="verifyCode"
    style="margin-left: 20px"
    >验证</s-button
  >
</template>

<script lang="ts">
import Vue from "vue";
import { VerificationCode } from "@unmian/simple-ui";

${"export default Vue.extend"}({
  data() {
    return {
      verificationCode: "", // 验证码
    };
  },
  methods: {
    /**
     * @description: 验证
     * @return
     */
    verifyCode(): void {
      if (this.$refs.verificationCode instanceof VerificationCode) {
      this.$refs.verificationCode.validate(this.verificationCode)
        .then(() => {
          MessageCommand.success("验证成功");
        })
        .catch(() => {
          MessageCommand.error("验证失败");
        });
      }
    },
  },
}
</${"script"}>
  `; // 示例代码

  /**
   * @description: 验证
   * @return
   */
  verifyCode(): void {
    if (this.$refs.verificationCode instanceof VerificationCode) {
      (this.$refs.verificationCode as InstanceType<typeof VerificationCode>)
        .validate(this.verificationCode)
        .then(() => {
          MessageCommand.success("验证成功");
        })
        .catch(() => {
          MessageCommand.error("验证失败");
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.verification-code-document {
  .example-list {
    display: flex;
  }
}
</style>
