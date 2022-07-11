<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:45:50
 * @LastEditors: Quarter
 * @Description: 简易的分页组件
 * @FilePath: /simple-ui/packages/pagination/src/pagination.vue
-->
<template>
  <div
    class="s-pagination"
    :class="{ 'plain-text': plain }"
    :style="alignStyle"
  >
    <div class="total" v-if="showCounter">
      共
      <span>{{ realTotal }}</span
      >条
    </div>
    <div class="page-size" v-if="showPagination">
      <s-select
        width="95px"
        height="26px"
        :value.sync="unsyncedSize"
        @change="updateSizeStatus"
      >
        <s-option
          v-for="(item, index) of sizeList"
          :key="`size-item-${index}`"
          :value="item"
          >{{ item }}条/页</s-option
        >
      </s-select>
    </div>
    <div class="page-list">
      <ul>
        <li :class="{ disabled: unsyncedPage <= 1 }">
          <button @click="previousPage">
            <template v-if="showWord">上一页</template>
            <template v-else>
              <i class="s-icon-arrow-left"></i>
            </template>
          </button>
        </li>
        <li
          v-for="(item, index) of buttonList"
          :key="`button-item-${index}`"
          :class="{ active: item === unsyncedPage }"
        >
          <button @click="changePage(item)">{{ item }}</button>
        </li>
        <li :class="{ disabled: unsyncedPage >= maxPageNumber }">
          <button @click="nextPage">
            <template v-if="showWord">下一页</template>
            <template v-else>
              <i class="s-icon-arrow-right"></i>
            </template>
          </button>
        </li>
      </ul>
    </div>
    <div class="go-page" v-if="showJumper">
      <div>前往</div>
      <div style="margin: 0 3px">
        <s-input
          width="40px"
          height="26px"
          :value.sync="pageValue"
          :maxlength="5"
          :show-counter="false"
          @keyup.enter="jumpPage"
        ></s-input>
      </div>
      <div>页</div>
    </div>
  </div>
</template>

<script lang="ts">
import { CommonAlign, CustomStyle } from "packages/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PageValue } from "./types";

@Component({
  name: "SPagination",
})
export default class SPagination extends Vue {
  @Prop({
    type: Number,
    default: 0,
  })
  total!: number; // 总数

  @Prop({
    type: Number,
    default: 10,
  })
  size!: number; // 分页尺寸

  @Prop({
    type: Number,
    default: 1,
  })
  page!: number; // 页码

  @Prop({
    type: String,
    default: "left",
  })
  align!: CommonAlign; // 排列方式

  @Prop({
    type: Boolean,
    default: false,
  })
  showCounter!: boolean; // 是否显示总数

  @Prop({
    type: Boolean,
    default: false,
  })
  showPagination!: boolean; // 是否显示分页

  @Prop({
    type: Boolean,
    default: false,
  })
  showJumper!: boolean; // 是否显示跳转

  @Prop({
    type: Boolean,
    default: false,
  })
  showWord!: boolean; // 是否显示文字

  @Prop({
    type: Boolean,
    default: false,
  })
  plain!: boolean; // 是否纯文字

  unsyncedPage = 1; // 分页页码
  unsyncedSize = 10; // 分页大小
  sizeList = [10, 20, 30, 50, 100]; // 分页列表
  pageValue = ""; // 跳转页

  /**
   * @description: 分页尺寸
   * @author: Quarter
   * @return {number}
   */
  get syncedSize(): number {
    return this.size;
  }

  /**
   * @description: 分页尺寸
   * @author: Quarter
   * @param {number} val 值
   * @return
   */
  set syncedSize(val: number) {
    this.$emit("update:size", val);
  }

  /**
   * @description: 同步的页码
   * @author: Quarter
   * @return {number}
   */
  get syncedPage(): number {
    return this.page;
  }

  /**
   * @description: 同步的页码
   * @author: Quarter
   * @param {number} val 值
   * @return
   */
  set syncedPage(val: number) {
    this.$emit("update:page", val);
  }

  /**
   * @description: 总条目数
   * @author: Quarter
   * @return
   */
  get realTotal(): number {
    if (typeof this.total === "number") {
      return this.total;
    }
    return 0;
  }

  /**
   * @description: 排列方式样式
   * @author: Quarter
   * @return {CustomStyle}
   */
  get alignStyle(): CustomStyle {
    const styles: CustomStyle = {};
    switch (this.align) {
      case "left":
        styles["justify-content"] = "flex-start";
        break;
      case "center":
        styles["justify-content"] = "center";
        break;
      case "right":
        styles["justify-content"] = "flex-end";
        break;
      default:
        styles["justify-content"] = "flex-start";
    }
    return styles;
  }

  /**
   * @description: 最大页码
   * @author: Quarter
   * @return {Array<Number>}
   */
  get maxPageNumber(): number {
    const totalPage: number = Math.ceil(this.realTotal / this.unsyncedSize);
    if (totalPage > 0) {
      return totalPage;
    }
    return 1;
  }

  /**
   * @description: 页码列表
   * @author: Quarter
   * @return {Array<PageValue>}
   */
  get buttonList(): PageValue[] {
    let list: PageValue[] = new Array();
    if (this.maxPageNumber < 7) {
      for (let i = 1; i <= this.maxPageNumber; i++) {
        list.push(i);
      }
    } else if (this.unsyncedPage < 5) {
      for (let i = 1; i <= 5; i++) {
        list.push(i);
      }
      list.push("…");
      list.push(this.maxPageNumber);
    } else if (this.unsyncedPage > this.maxPageNumber - 4) {
      list = list.concat([1, 2, "…"]);
      for (let i = this.maxPageNumber - 4; i <= this.maxPageNumber; i++) {
        list.push(i);
      }
    } else {
      list = list.concat([
        1,
        2,
        "…",
        this.unsyncedPage - 1,
        this.unsyncedPage,
        this.unsyncedPage + 1,
        "…",
        this.maxPageNumber - 1,
        this.maxPageNumber,
      ]);
    }
    return list;
  }

  /**
   * @description: 生命周期
   * @author: Quarter
   * @return
   */
  created(): void {
    if (this.sizeList.indexOf(this.syncedSize)) {
      this.unsyncedSize = this.syncedSize;
    } else {
      this.syncedSize = this.unsyncedSize;
    }
  }

  /**
   * @description: 监听传入页码的变化
   * @author: Quarter
   * @return
   */
  @Watch("syncedPage", {
    immediate: true,
  })
  handleSyncedPageChange(): void {
    if (
      typeof this.syncedPage === "number" &&
      this.syncedPage !== this.unsyncedPage
    ) {
      this.unsyncedPage = this.syncedPage;
    }
  }

  /**
   * @description: 修改分页的大小
   * @author: Quarter
   * @return
   */
  updateSizeStatus(): void {
    this.syncedSize = this.unsyncedSize;
    this.unsyncedPage = 1;
    this.syncedPage = this.unsyncedPage;
    this.$emit("change", this.unsyncedPage, this.unsyncedSize);
  }

  /**
   * @description: 切换页码
   * @author: Quarter
   * @param {PageValue} page 页码
   * @return
   */
  changePage(page: PageValue): void {
    if (typeof page === "number" && page !== this.unsyncedPage) {
      this.unsyncedPage = page;
      this.syncedPage = this.unsyncedPage;
      this.$emit("change", this.unsyncedPage, this.unsyncedSize);
    }
  }

  /**
   * @description: 上一页
   * @author: Quarter
   * @return
   */
  previousPage(): void {
    if (this.unsyncedPage > 1) {
      this.changePage(this.unsyncedPage - 1);
    }
  }

  /**
   * @description: 下一页
   * @author: Quarter
   * @return
   */
  nextPage(): void {
    if (this.unsyncedPage < this.maxPageNumber) {
      this.changePage(this.unsyncedPage + 1);
    }
  }

  /**
   * @description: 页面跳转
   * @author: Quarter
   * @return
   */
  jumpPage(): void {
    const page: number = parseInt(this.pageValue, 10);
    if (typeof page === "number") {
      if (
        page !== this.unsyncedPage &&
        page > 0 &&
        page <= this.maxPageNumber
      ) {
        this.changePage(page);
      }
      this.pageValue = "";
    }
  }
}
</script>

<style lang="scss">
.s-pagination {
  .page-size .s-select .select-input {
    font-size: 12px;
  }

  .go-page .s-input .input-content input {
    text-align: center;
  }
}
</style>

<style lang="scss">
.s-pagination {
  width: 100%;
  display: flex;
  align-items: center;

  > div:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  .total {
    color: #666666;
    font-size: 12px;

    span {
      margin: 0 5px;
    }
  }

  .page-list {
    ul {
      padding: 0;
      list-style: none;
      border-radius: 2px;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin: 0;

      li {
        border: 1px solid #d6e1e5;

        button {
          min-width: 24px;
          height: 24px;
          padding: 0 8px;
          color: #333333;
          font-size: 12px;
          border: none;
          cursor: default;
          background: none;
        }

        &:not(:first-of-type) {
          border-left: none;
        }

        &:not(.active) button {
          cursor: pointer;

          &:hover {
            color: #549fff;
          }
        }

        &.disabled button,
        &.disabled button:hover {
          cursor: not-allowed;
          color: #dcdcdc;
        }

        &.active {
          border-color: #549fff;

          button {
            color: #ffffff;
            background-color: #549fff;
          }
        }
      }
    }
  }

  .go-page {
    color: #666666;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  &.plain-text .page-list li {
    border: none;

    &.active button {
      color: #549fff;
      background: none;
    }
  }
}
</style>
