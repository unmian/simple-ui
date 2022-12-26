<!--
 * @Author: Quarter
 * @Date: 2022-05-16 10:50:33
 * @LastEditTime: 2022-12-13 15:30:58
 * @LastEditors: Quarter
 * @Description: 示例代码
 * @FilePath: /simple-ui/documents/views/document/avatar/size-demo.vue
-->
<template>
  <div class="example-list">
    <ul>
      <li>
        <div class="avatar">
          <s-avatar size="mini" :url="url"></s-avatar>
        </div>
        <div class="desc">mini(24x24)</div>
      </li>
      <li>
        <div class="avatar">
          <s-avatar size="small" :url="url"></s-avatar>
        </div>
        <div class="desc">small(32x32)</div>
      </li>
      <li>
        <div class="avatar">
          <s-avatar size="medium" :url="url"></s-avatar>
        </div>
        <div class="desc">medium(48x48)</div>
      </li>
      <li>
        <div class="avatar">
          <s-avatar size="large" :url="url"></s-avatar>
        </div>
        <div class="desc">large(64x64)</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import userBigUrl from "documents/assets/user-big.png";

@Component
export default class AvatarSizeDemo extends Vue {
  // 头像地址
  url = userBigUrl;
}
</script>

<style lang="scss" scoped>
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
</style>
