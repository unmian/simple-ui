<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-07 16:41:21
 * @Description: 表单验证文档
 * @FilePath: /simple-ui/documents/views/document/FormDocument.vue
-->
<template>
  <div class="form-document">
    <document-page title="表单验证项 FormItem" :code="code">
      <template v-slot:desc>
        这是一个表单项组件，用以显示表单中的每一项内容，必须和 Form 组合使用。
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>name</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>数据名，和数据对象中数据的key值对应</td>
          </tr>
          <tr>
            <td>label</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>显示的表单的名称</td>
          </tr>
          <tr>
            <td>align</td>
            <td>否</td>
            <td>CommonPosition</td>
            <td>否</td>
            <td>-</td>
            <td>left/top/right</td>
            <td>表单项排列方式</td>
          </tr>
          <tr>
            <td>required</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否是必须的（仅用作显示，不作验证）</td>
          </tr>
          <tr>
            <td>without-label</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否不需要名称</td>
          </tr>
        </tbody>
      </template>
    </document-page>
    <document-page title="表单验证 Form" :code="code">
      <template v-slot:desc
        >表单验证组件，对表单内容进行自动校验提示。</template
      >
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>form-data</td>
            <td>否</td>
            <td>CustomFormData</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>表单数据构成的对象</td>
          </tr>
          <tr>
            <td>rules</td>
            <td>否</td>
            <td>FormRules</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>表单验证规则构成的对象</td>
          </tr>
          <tr>
            <td>without-label</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否不需要名称</td>
          </tr>
          <tr>
            <td>label-width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>120px</td>
            <td>-</td>
            <td>表单名称的宽度</td>
          </tr>
          <tr>
            <td>align</td>
            <td>否</td>
            <td>CommonPosition</td>
            <td>否</td>
            <td>left</td>
            <td>left/top/right</td>
            <td>表单的排列方式</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>validate</td>
            <td>-</td>
            <td>-</td>
            <td>
              一个验证表单的异步函数，当验证不通过时会进入包含错误信息的reject中。
            </td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-form ref="UserInfoForm" :form-data="formData" :rules="formRules">
            <s-form-item name="name" label="姓名" required>
              <s-input
                width="320px"
                v-model="formData.name"
                placeholder="请输入姓名"
                :maxlength="8"
              ></s-input>
            </s-form-item>
            <s-form-item name="sex" label="性别" required>
              <s-radio v-model="formData.sex" label="0">男</s-radio>
              <s-radio v-model="formData.sex" label="1">女</s-radio>
            </s-form-item>
            <s-form-item name="hobby" label="爱好">
              <s-checkbox-group v-model="formData.hobby">
                <s-checkbox :label="0">运动</s-checkbox>
                <s-checkbox :label="1">旅游</s-checkbox>
                <s-checkbox :label="2">游戏</s-checkbox>
                <s-checkbox :label="3">电影</s-checkbox>
                <s-checkbox :label="4">音乐</s-checkbox>
                <s-checkbox :label="5">社交</s-checkbox>
              </s-checkbox-group>
            </s-form-item>
            <s-form-item name="introduction" label="自我介绍">
              <s-textarea
                width="320px"
                :rows="5"
                v-model="formData.introduction"
                placeholder="请简要的介绍一下自己"
                :maxlength="200"
              ></s-textarea>
            </s-form-item>
            <s-form-item>
              <s-button type="normal" fill @click="validateForm"
                >验证表单</s-button
              >
            </s-form-item>
          </s-form>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Form, CustomFormData, FormRules } from "@quarter/simple-ui";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FormDocument",
  components: {
    DocumentPage,
  },
})
export default class FormDocument extends Vue {
  $refs!: {
    UserInfoForm: Form; // 用户信息表单
  };

  loading = false; // 加载
  formData: CustomFormData = {
    // 个人信息表单
    name: null,
    sex: null,
    hobby: [],
    introduction: null,
  };
  formRules: FormRules = {
    // 表单的验证规则
    name: [
      { required: true, trigger: "change", message: "姓名为必填项" },
      {
        trigger: "change",
        reg: new RegExp(/^(.){2,8}$/),
        message: "姓名由 2-8 位构成",
      },
    ],
    sex: [{ required: true, trigger: "change", message: "性别为必填项" }],
  };
  code = `
<template>
  <s-form ref="UserInfoForm" :form-data="formData" :rules="formRules">
    <s-form-item name="name" label="姓名" required>
      <s-input
        width="320px"
        v-model="formData.name"
        placeholder="请输入姓名"
        :maxlength="8"
      ></s-input>
    </s-form-item>
    <s-form-item name="sex" label="性别" required>
      <s-radio v-model="formData.sex" label="0">男</s-radio>
      <s-radio v-model="formData.sex" label="1">女</s-radio>
    </s-form-item>
    <s-form-item name="hobby" label="爱好">
      <s-checkbox-group v-model="formData.hobby">
        <s-checkbox :label="0">运动</s-checkbox>
        <s-checkbox :label="1">旅游</s-checkbox>
        <s-checkbox :label="2">游戏</s-checkbox>
        <s-checkbox :label="3">电影</s-checkbox>
        <s-checkbox :label="4">音乐</s-checkbox>
        <s-checkbox :label="5">社交</s-checkbox>
      </s-checkbox-group>
    </s-form-item>
    <s-form-item name="introduction" label="自我介绍">
      <s-textarea
        width="320px"
        :rows="5"
        v-model="formData.introduction"
        placeholder="请简要的介绍一下自己"
        :maxlength="200"
      ></s-textarea>
    </s-form-item>
    <s-form-item>
      <s-button fill type="normal" @click="validateForm"
        >验证表单</s-button
      >
    </s-form-item>
  </s-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { DocumentPage } from "documents/components";
import { Form } from "@quarter/simple-ui";

@Component({
  components: {
    DocumentPage,
  },
})
export default class FormDocument extends Vue {
  $refs!: {
    userForm: Form;
  };

  // 个人信息表单
  private formData: CustomFormData = {
    name: null,
    sex: null,
    hobby: [],
    introduction: null,
  };
  // 表单的验证规则
  private formRules: FormRules = {
    name: [
      { required: true, trigger: "change", message: "姓名为必填项" },
      {
        trigger: "change",
        reg: new RegExp(/^(.){2,8}$/),
        message: "姓名由 2-8 位构成",
      },
    ],
    sex: [{ required: true, trigger: "change", message: "性别为必填项" }],
  };

  /**
   * @description: 表单验证
   * @author: Quarter
   * @return
   */
  private validateForm(): void {
    this.$refs.userForm.validate()
      .then(() => {
        alert("验证成功");
      })
      .catch((msg: string) => {
        alert(msg);
      });
  }
}
</${"script"}>
  `; // 示例代码

  /**
   * @description: 表单验证
   * @author: Quarter
   * @return
   */
  validateForm(): void {
    if (this.$refs.UserInfoForm instanceof Form) {
      console.log(123);
      this.$refs.UserInfoForm.validate()
        .then(() => {
          alert("验证成功");
        })
        .catch((msg: string) => {
          alert(msg);
        });
    }
  }
}
</script>

<style lang="scss" scoped></style>
