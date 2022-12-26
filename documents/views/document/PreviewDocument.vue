<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:27:13
 * @Description: 媒体预览文档
 * @FilePath: /simple-ui/documents/views/document/PreviewDocument.vue
-->
<template>
  <div class="preview-document">
    <document-page title="媒体预览 Preview" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的全屏预览媒体资源的组件。</p>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>preview</td>
            <td>-</td>
            <td>-</td>
            <td>打开多媒体预览</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div>
          <s-preview ref="imagePreview" style="width: 320px">
            <img src="documents/assets/demo.jpg" alt="demo.jpg" />
          </s-preview>
          <s-button type="normal" outline style="margin-top: 20px" @click="previewImage"
            >预览</s-button
          >
        </div>
        <div style="margin-top: 30px">
          <s-preview ref="videoPreview" style="width: 320px">
            <video src="documents/assets/demo.mp4" />
          </s-preview>
          <s-button type="normal" outline style="margin-top: 20px" @click="previewVideo"
            >预览</s-button
          >
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Preview } from "@unmian/simple-ui";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PreviewDocument",
  components: {
    DocumentPage,
  },
})
export default class PreviewDocument extends Vue {
  code = `
<template>
  <div>
    <s-preview ref="imagePreview" style="width: 320px">
      <img src="documents/assets/demo.jpg" alt="demo.jpg" />
    </s-preview>
    <s-button
      type="normal"
      outline
      style="margin-top: 20px"
      @click="previewImage"
      >预览</s-button
    >
  </div>
  <div style="margin-top: 30px">
    <s-preview ref="videoPreview" style="width: 320px">
      <video src="documents/assets/demo.mp4" alt="demo.mp4" />
    </s-preview>
    <s-button
      type="normal"
      outline
      style="margin-top: 20px"
      @click="previewVideo"
      >预览</s-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Preview } from "@unmian/simple-ui";

${"export default Vue.extends"}({
  methods: {
    /**
   * @description: 预览图片
   * @return
   */
    previewImage(): void {
      if (this.$refs.imagePreview instanceof Preview) {
        this.$refs.imagePreview.preview();
      }
    },
    /**
     * @description: 预览视频
     * @return
     */
    previewVideo(): void {
      if (this.$refs.videoPreview instanceof Preview) {
        this.$refs.videoPreview.preview();
      }
    },
  },
});
</${"script"}>
  `; // 示例代码

  /**
   * @description: 预览图片
   * @return
   */
  previewImage(): void {
    if (this.$refs.imagePreview instanceof Preview) {
      (this.$refs.imagePreview as InstanceType<typeof Preview>).preview();
    }
  }

  /**
   * @description: 预览视频
   * @return
   */
  previewVideo(): void {
    if (this.$refs.videoPreview instanceof Preview) {
      (this.$refs.videoPreview as InstanceType<typeof Preview>).preview();
    }
  }
}
</script>

<style lang="scss" scoped></style>
