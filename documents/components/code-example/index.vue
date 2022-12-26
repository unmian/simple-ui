<!--
 * @Author: Quarter
 * @Date: 2022-05-16 09:13:25
 * @LastEditTime: 2022-12-13 15:15:30
 * @LastEditors: Quarter
 * @Description: 示例代码块
 * @FilePath: /simple-ui/documents/components/code-example/index.vue
-->
<template>
  <div class="code-example" v-loading="loading > 0">
    <div class="code-example__body">
      <component :is="customComponent"></component>
    </div>
    <div class="code-example__operation">
      <s-button
        icon="window-code-block"
        variant="plain"
        shape="square"
        @click="codeVisible = !codeVisible"
      ></s-button>
    </div>
    <collapse-transition>
      <div class="code-example__code" v-show="codeVisible">
        <s-scroll full show-bar>
          <code>
            <pre>{{ filterCode }}</pre>
          </code>
        </s-scroll>
      </div>
    </collapse-transition>
    <div class="example-name" v-if="name">
      <s-icon size="14" name="bulb"></s-icon>
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "./index.scss";

@Component({
  name: "CodeExample",
})
export default class CodeExample extends Vue {
  // 示例名称
  @Prop(String)
  readonly name?: string;

  // 加载动画
  loading = 0;
  // 代码可见
  codeVisible = false;
  // 示例代码
  code = "";
  // 自定义组件
  customComponent = () => import(/* @vite-ignore */ `${this.$attrs.url}`);

  /**
   * @description: 干净的代码
   * @return {string}
   */
  get filterCode(): string {
    if (typeof this.code === "string") {
      return this.code.replace(/^<!--(.*)(\r\n|\r|\n)(\s\*(.+)(\r\n|\r|\n))+-->(\r\n|\r|\n)/gm, "");
    }
    return "";
  }

  /**
   * @description: 声明周期函数
   * @return
   */
  created(): void {
    this.loading++;
    if (import.meta.env.PROD) {
      fetch(`${this.$attrs.url}`)
        .then((res) => res.text())
        .then((text) => {
          this.code = text;
        })
        .finally(() => {
          this.loading--;
        });
    } else {
      import(/* @vite-ignore */ `${this.$attrs.url}?raw`)
        .then((res) => {
          this.code = res.default;
        })
        .finally(() => {
          this.loading--;
        });
    }
  }
}
</script>
