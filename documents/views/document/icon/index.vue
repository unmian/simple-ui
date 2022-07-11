<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-08 14:17:49
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/document/icon/index.vue
-->
<template>
  <div class="icon-document">
    <document-page title="图标 Icon">
      <template v-slot:desc>
        <p>这是 UI 组件库内置的一些图标。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>name</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>help-questionmark</td>
            <td>-</td>
            <td>图标名称</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>Number | String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>图标尺寸</td>
          </tr>
          <tr>
            <td>color</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>图标颜色</td>
          </tr>
          <tr>
            <td>url</td>
            <td>否</td>
            <td>String | String[]</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>第三方图标库地址</td>
          </tr>
        </tbody>
      </template>
      <template>
        <div class="icon-list">
          <div v-for="(group, index) of icons" :key="`group-item-${index}`" class="icon-group">
            <div class="group-name">
              <s-iconfont size="24" name="label"></s-iconfont>
              <span>{{ group.groupName }}</span>
            </div>
            <ul>
              <li
                v-for="(icon, index2) of group.children"
                :key="`icon-item-${index}-${index2}`"
                @click="copyIconName(icon)"
              >
                <s-icon size="32" :name="icon"></s-icon>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";
import icons from "documents/assets/icons.json";

@Component({
  components: {
    DocumentPage,
  },
})
export default class IconDocument extends Vue {
  /**
   * @description: 图标
   * @author: Quarter
   * @return {Array}
   */
  get icons(): any[] {
    return icons;
  }

  /**
   * @description: 复制图标名称
   * @author: Quarter
   * @param {string} name 名称
   * @return
   */
  copyIconName(name: string): void {
    if (typeof name === "string" && navigator.clipboard) {
      navigator.clipboard.writeText(name);
      this.$message.success(`图标名称复制成功 【${name}】`);
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-group {
  margin-top: 48px;
}

.group-name {
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 48px;

  span {
    margin-left: 12px;
  }
}

.icon-list {
  width: 100%;
  padding-bottom: 96px;
  box-sizing: border-box;

  ul {
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;

    li {
      width: 80px;
      height: 80px;
      text-align: center;
      cursor: pointer;
      border-radius: 12px;
      box-sizing: border-box;
      transform: scale(1);
      transition: all 0.2s linear;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 12px;

      &:hover {
        transform: scale(1.25);
        background-color: var(--s-gray-100);
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .icon-list ul li:hover {
        background-color: var(--s-gray-1200);
  }
}
</style>
