<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-08 14:55:59
 * @LastEditors: Quarter
 * @Description: 文本
 * @FilePath: /simple-ui/documents/views/document/text/index.vue
-->
<template>
  <div class="escape-document">
    <document-page title="文本 Text">
      <template v-slot:desc>
        <p>本页面定义了 UI 框架中的各等级文字的字号行号</p>
      </template>
      <template v-slot:default>
        <div class="text-list">
          <div class="s-text-1">一级文字 / 常规 / 1.8rem / 行高 2.2rem</div>
          <div class="s-text-2">二级文字 / 常规 / 1rem / 行高 1.4rem</div>
          <div class="s-text-3">三级文字 / 常规 / 0.8rem / 行高 1.2rem</div>
          <div class="s-text-4">四级文字 / 常规 / 0.7rem / 行高 1.1rem</div>
          <div class="s-text-5">五级文字 / 常规 / 0.6rem / 行高 1rem</div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage, ColorBlock } from "documents/components";

@Component({
  name: "TextDocument",
  components: {
    DocumentPage,
    ColorBlock,
  },
})
export default class TextDocument extends Vue {}
</script>

<style lang="scss" scoped>
.text-list div:nth-child(n + 2) {
  margin-top: var(--s-spacing-24);
}
</style>
