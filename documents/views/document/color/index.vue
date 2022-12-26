<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:31:43
 * @LastEditors: Quarter
 * @Description: 色卡
 * @FilePath: /simple-ui/documents/views/document/color/index.vue
-->
<template>
  <div class="escape-document">
    <document-page title="颜色 Color">
      <template v-slot:desc>
        <p>这里定义本 UI 框架中的色系规范，UI 框架中的组件都依据对应的色系进行设计开发</p>
      </template>
      <template v-slot:default>
        <div class="theme-list">
          <div
            class="theme-item"
            v-for="theme of themeColorDefinition"
            :key="`theme-item-${theme.color}`"
          >
            <h2>{{ theme.title }}</h2>
            <ul class="color-list">
              <color-block
                v-for="color of theme.colors"
                :key="`${theme.color}-level-${color.level}`"
                :code="color.code"
                :opacity="color.opacity"
                :color="theme.color"
                :theme="theme.theme"
                :name="color.name"
                :mode="color.mode"
                :level="color.level"
              ></color-block>
            </ul>
          </div>
        </div>
        <div class="theme-list">
          <div
            class="theme-item"
            v-for="font of fontColorDefinition"
            :key="`font-item-${font.color}`"
          >
            <h2>{{ font.title }}</h2>
            <ul class="color-list" :class="`color-list-${font.color}`">
              <color-block
                v-for="color of font.colors"
                :key="`${font.color}-level-${color.level}`"
                :code="color.code"
                :opacity="color.opacity"
                :color="font.color"
                :name="color.name"
                :mode="color.mode"
                :level="color.level"
              ></color-block>
            </ul>
          </div>
        </div>
        <div class="theme-list">
          <div
            class="theme-item"
            v-for="neuter of neutralColorDefinition"
            :key="`neuter-item-${neuter.color}`"
          >
            <h2>{{ neuter.title }}</h2>
            <ul class="color-list" :class="`color-list-${neuter.color}`">
              <color-block
                v-for="color of neuter.colors"
                :key="`${neuter.color}-level-${color.level}`"
                :code="color.code"
                :opacity="color.opacity"
                :color="neuter.color"
                :name="color.name"
                :mode="color.mode"
                :level="color.level"
              ></color-block>
            </ul>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage, ColorBlock } from "documents/components";
import themeColorDefinition from "documents/assets/color/theme.json";
import fontColorDefinition from "documents/assets/color/font.json";
import neutralColorDefinition from "documents/assets/color/neuter.json";

@Component({
  name: "ColorDocument",
  components: {
    DocumentPage,
    ColorBlock,
  },
})
export default class ColorDocument extends Vue {
  // 主题色彩定义
  themeColorDefinition = themeColorDefinition;
  // 字体色彩定义
  fontColorDefinition = fontColorDefinition;
  // 中性色彩定义
  neutralColorDefinition = neutralColorDefinition;
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  max-width: 1000px;
}

.theme-list {
  display: flex;
  flex-wrap: wrap;
}

.theme-item {
  width: 320px;
  margin: 0 var(--s-spacing-48) var(--s-spacing-48) 0;
}

.color-list {
  padding: 0;
  list-style: none;
  margin: var(--s-spacing-24) 0 0 0;
}

.color-list-font-gray {
  background-color: white;
}

.color-list-font-white {
  background-color: black;
}
</style>
