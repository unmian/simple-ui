<!--
 * @Author: Quarter
 * @Date: 2020-09-29 08:58:56
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:59:31
 * @Description: 头像文档
 * @FilePath: /simple-ui/documents/views/AvatarDocument.vue
-->

<template>
  <div class="avatar-document">
    <document-page title="头像 SimpleAvatar" :code="code">
      <template v-slot:desc>
        <p>这是一个头像组件，用以显示用户头像。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>SimpleSize</td>
            <td>否</td>
            <td>small</td>
            <td>mini/small/medium/large</td>
            <td>头像的尺寸</td>
          </tr>
          <tr>
            <td>src</td>
            <td>是</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>头像的图片路径，不支持 @ 路径</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <div class="avatar">
                <simple-avatar size="mini" :src="url"></simple-avatar>
              </div>
              <div class="desc">mini(30x30)</div>
            </li>
            <li>
              <div class="avatar">
                <simple-avatar size="small" :src="url"></simple-avatar>
              </div>
              <div class="desc">small(50x50)</div>
            </li>
            <li>
              <div class="avatar">
                <simple-avatar size="medium" :src="url"></simple-avatar>
              </div>
              <div class="desc">medium(70x70)</div>
            </li>
            <li>
              <div class="avatar">
                <simple-avatar size="large" :src="url"></simple-avatar>
              </div>
              <div class="desc">large(90x90)</div>
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
import userBigUrl from "documents/assets/user-big.png";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      showCode: false,
      url: userBigUrl,
      code: `
<template>
  <div>
    <simple-avatar size="mini" :src="url"></simple-avatar>
    <simple-avatar size="small" :src="url"></simple-avatar>
    <simple-avatar size="medium" :src="url"></simple-avatar>
    <simple-avatar size="large" :src="url"></simple-avatar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend(\{
  data() {
    return {
      url: "documents/assets/user-big.png",
    };
  },
});
</${"script"}>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar-document {
  .example-list {
    width: 100%;

    ul {
      width: 100%;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0;

      li {
        width: 20%;
        padding: 20px 0;

        .avatar {
          width: 100%;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .desc {
          text-align: center;
          margin-top: 25px;
        }
      }
    }
  }
}
</style>