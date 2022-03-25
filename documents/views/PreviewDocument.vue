<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:39:10
 * @Description: 媒体预览文档
 * @FilePath: /simple-ui/documents/views/PreviewDocument.vue
-->
<template>
  <div class="preview-document">
    <document-page title="媒体预览 SimplePreview" :code="code">
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
          <simple-preview ref="imagePreview" style="width: 320px">
            <img src="documents/assets/demo.jpg" alt="demo.jpg" />
          </simple-preview>
          <simple-button type="normal" outline style="margin-top: 20px" @click="previewImage">预览</simple-button>
        </div>
        <div style="margin-top: 30px">
          <simple-preview ref="videoPreview" style="width: 320px">
            <video src="documents/assets/demo.mp4" alt="demo.mp4" />
          </simple-preview>
          <simple-button type="normal" outline style="margin-top: 20px" @click="previewVideo">预览</simple-button>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import { SimplePreview } from "packages";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      code: `
<template>
  <div>
    <simple-preview ref="imagePreview" style="width: 320px">
      <img src="documents/assets/demo.jpg" alt="demo.jpg" />
    </simple-preview>
    <simple-button
      type="normal"
      outline
      style="margin-top: 20px"
      @click="previewImage"
      >预览</simple-button
    >
  </div>
  <div style="margin-top: 30px">
    <simple-preview ref="videoPreview" style="width: 320px">
      <video src="documents/assets/demo.mp4" alt="demo.mp4" />
    </simple-preview>
    <simple-button
      type="normal"
      outline
      style="margin-top: 20px"
      @click="previewVideo"
      >预览</simple-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SimplePreview } from "simple-ui";

${"export default Vue.extends"}({
  methods: {
    /**
   * @description: 预览图片
   * @author: Quarter
   * @return
   */
    previewImage(): void {
      if (this.$refs.imagePreview instanceof SimplePreview) {
        this.$refs.imagePreview.preview();
      }
    },
    /**
     * @description: 预览视频
     * @author: Quarter
     * @return
     */
    previewVideo(): void {
      if (this.$refs.videoPreview instanceof SimplePreview) {
        this.$refs.videoPreview.preview();
      }
    },
  },
});
</${"script"}>
      `,
    };
  },
  methods: {
    /**
   * @description: 预览图片
   * @author: Quarter
   * @return
   */
    previewImage(): void {
      if (this.$refs.imagePreview instanceof SimplePreview) {
        (this.$refs.imagePreview as InstanceType<typeof SimplePreview>).preview();
      }
    },
    /**
     * @description: 预览视频
     * @author: Quarter
     * @return
     */
    previewVideo(): void {
      if (this.$refs.videoPreview instanceof SimplePreview) {
        (this.$refs.videoPreview as InstanceType<typeof SimplePreview>).preview();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>