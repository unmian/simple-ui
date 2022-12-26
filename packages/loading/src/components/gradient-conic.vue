<!--
 * @Author: Quarter
 * @Date: 2022-12-15 18:36:47
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-15 19:31:28
 * @FilePath: /simple-ui/packages/loading/src/components/gradient-conic.vue
 * @Description: 渐变环形加载动画
-->
<template>
  <div class="s-loading__gradient-conic"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "GradientConic",
})
export default class GradientConic extends Vue {}
</script>

<style lang="scss">
.s-loading__gradient-conic {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-image: conic-gradient(from 90deg at 50% 50%, var(--s-background-primary) 0deg, currentcolor 360deg);
  mask: radial-gradient(transparent 42%, white 50%);
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
