<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:40:17
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/IconDocument.vue
-->

<template>
  <div class="icon-document">
    <document-page title="图标">
      <template v-slot:desc>
        <p>这是本框架内置的一些图标库。</p>
      </template>
      <template>
        <div class="icon-list">
          <ul>
            <li v-for="icon of icons" :key="`icon-item-${icon.id}`">
              <div class="icon-example">
                <i :class="icon.class"></i>
              </div>
              <div class="icon-name">{{ icon.class }}</div>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import iconfont from "documents/assets/iconfont.json";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      iconConfig: iconfont, // 图标库
    };
  },
  computed: {
    /**
     * @description: 图标
     * @author: Quarter
     * @return {Array}
     */
    icons(): any[] {
      const arr: any[] = new Array();
      if (this.iconConfig && Array.isArray(this.iconConfig.glyphs)) {
        this.iconConfig.glyphs.forEach((icon: any) => {
          arr.push({
            id: icon.icon_id,
            name: icon.name,
            class: this.iconConfig.css_prefix_text + icon.font_class,
          });
        });
      }
      return arr;
    },
  },
});
</script>

<style lang="scss" scoped>
.icon-document {
  .icon-list {
    width: 100%;
    box-sizing: border-box;

    ul {
      width: 100%;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      margin: 0;

      li {
        width: 140px;
        padding: 20px 15px;
        text-align: center;
        box-sizing: border-box;
        border-top: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;

        .icon-example {
          height: 70px;
          font-size: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-name {
          color: #999999;
          font-size: 14px;
        }

        &:nth-of-type(6n + 1) {
          border-left: 1px solid #eeeeee;
        }

        &:nth-of-type(n + 7) {
          border-top: none;
        }
      }
    }
  }
}
</style>