<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:39:41
 * @Description: 图形验证码文档
 * @FilePath: /simple-ui/documents/views/VerificationCodeDocument.vue
-->
<template>
  <div class="verification-code-document">
    <document-page title="图形验证码 SimpleVerificationCode" :code="code">
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
          <simple-input
            width="150px"
            v-model="verificationCode"
            placeholder="请输入验证码"
            :maxlength="4"
          ></simple-input>
          <simple-verification-code ref="verificationCode" style="margin-left: 20px"></simple-verification-code>
          <simple-button outline type="normal" @click="verifyCode" style="margin-left: 20px">验证</simple-button>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import { SimpleVerificationCode } from "packages";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      verificationCode: "", // 验证码
      code: `
<template v-slot:example>
  <simple-input
    width="150px"
    v-model="verificationCode"
    placeholder="请输入验证码"
    :maxlength="4"
  ></simple-input>
  <simple-verification-code
    ref="verificationCode"
    style="margin-left: 20px"
  ></simple-verification-code>
  <simple-button
    outline
    type="normal"
    @click="verifyCode"
    style="margin-left: 20px"
    >验证</simple-button
  >
</template>

<script lang="ts">
import Vue from "vue";
import { SimpleVerificationCode } from "simple-ui";

${"export default Vue.extend"}({
  data() {
    return {
      verificationCode: "", // 验证码
    };
  },
  methods: {
    /**
     * @description: 验证
     * @author: Quarter
     * @return
     */
    verifyCode(): void {
      if (this.$refs.verificationCode instanceof SimpleVerificationCode) {
      this.$refs.verificationCode.validate(this.verificationCode)
        .then(() => {
          this.$message.success("验证成功");
        })
        .catch(() => {
          this.$message.error("验证失败");
        });
      }
    },
  },
}
</${"script"}>
      `,
    };
  },
  methods: {
    /**
     * @description: 验证
     * @author: Quarter
     * @return
     */
    verifyCode(): void {
      if (this.$refs.verificationCode instanceof SimpleVerificationCode) {
        (this.$refs.verificationCode as InstanceType<typeof SimpleVerificationCode>).validate(this.verificationCode)
          .then(() => {
            this.$message.success("验证成功");
          })
          .catch(() => {
            this.$message.error("验证失败");
          });
      }
    },
  },
});
export class VerificationCodeDocument extends Vue {

}
</script>

<style lang="scss" scoped>
.verification-code-document {
  .example-list {
    display: flex;
  }
}
</style>