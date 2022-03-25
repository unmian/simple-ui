<!--
 * @Author: Quarter
 * @Date: 2020-08-04 16:56:41
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 09:01:12
 * @Description: 简易的分页组件
--> 
<template>
  <div class="simple-pagination" :class="{ 'plain-text': plain }" :style="alignStyle">
    <div class="total" v-if="showCounter">
      共
      <span>{{ realTotal }}</span>条
    </div>
    <div class="page-size" v-if="showPagination">
      <simple-select
        width="95px"
        height="26px"
        :value.sync="unsyncedSize"
        @change="updateSizeStatus"
      >
        <simple-option
          v-for="(item, index) of sizeList"
          :key="`size-item-${index}`"
          :value="item"
        >{{ item }}条/页</simple-option>
      </simple-select>
    </div>
    <div class="page-list">
      <ul>
        <li :class="{ disabled: unsyncedPage <= 1 }">
          <button @click="previousPage">
            <template v-if="showWord">上一页</template>
            <template v-else>
              <i class="simple-icon-arrow-left"></i>
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
              <i class="simple-icon-arrow-right"></i>
            </template>
          </button>
        </li>
      </ul>
    </div>
    <div class="go-page" v-if="showJumper">
      <div>前往</div>
      <div style="margin: 0 3px">
        <simple-input
          width="40px"
          height="26px"
          :value.sync="pageValue"
          :maxlength="5"
          :show-counter="false"
          @keyup.enter="jumpPage"
        ></simple-input>
      </div>
      <div>页</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleAlign, SimpleCustomStyle, SimplePageValue } from "../types";

export default Vue.extend({
  name: "SimplePagination",
  props: {
    total: { // 总数
      type: Number,
      default: 0,
    },
    size: { // 分页尺寸
      type: Number,
      default: 10,
    },
    page: { // 页码
      type: Number,
      default: 1,
    },
    align: { // 排列方式
      type: String,
      default: "left",
    } as PropOptions<SimpleAlign>,
    showCounter: { // 是否显示总数
      type: Boolean,
      default: false,
    },
    showPagination: { // 是否显示分页
      type: Boolean,
      default: false,
    },
    showJumper: { // 是否显示跳转
      type: Boolean,
      default: false,
    },
    showWord: {// 是否显示文字
      type: Boolean,
      default: false,
    },
    plain: { // 是否纯文字
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      unsyncedPage: 1, // 分页页码
      unsyncedSize: 10, // 分页大小
      sizeList: [10, 20, 30, 50, 100], // 分页列表
      pageValue: "", // 跳转页
    };
  },
  computed: {
    /**
     * @description: 分页尺寸
     * @author: Quarter
     * @return {number}
     */
    syncedSize: {
      get(): number {
        return this.size;
      },
      set(val: number): void {
        this.$emit("update:size", val);
      },
    },
    /**
     * @description: 同步的页码
     * @author: Quarter
     * @return {number}
     */
    syncedPage: {
      get(): number {
        return this.page;
      },
      set(val: number): void {
        this.$emit("update:page", val);
      },
    },
    /**
     * @description: 总条目数
     * @author: Quarter
     * @return
     */
    realTotal(): number {
      if (typeof this.total === "number") {
        return this.total;
      }
      return 0;
    },
    /**
     * @description: 排列方式样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    alignStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {};
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
    },
    /**
     * @description: 最大页码
     * @author: Quarter
     * @return {Array<Number>}
     */
    maxPageNumber(): number {
      const totalPage: number = Math.ceil(this.realTotal / this.unsyncedSize);
      if (totalPage > 0) {
        return totalPage;
      }
      return 1;
    },
    /**
     * @description: 页码列表
     * @author: Quarter
     * @return {Array<SimplePageValue>}
     */
    buttonList(): SimplePageValue[] {
      let list: SimplePageValue[] = new Array();
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
    },
  },
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
  },
  watch: {
    /**
     * @description: 监听传入页码的变化
     * @author: Quarter
     * @return
     */
    syncedPage: {
      immediate: true,
      handler(): void {
        if (
          typeof this.syncedPage === "number" &&
          this.syncedPage !== this.unsyncedPage
        ) {
          this.unsyncedPage = this.syncedPage;
        }
      },
    },
  },
  methods: {
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
    },
    /**
     * @description: 切换页码
     * @author: Quarter
     * @param {SimplePageValue} page 页码
     * @return
     */
    changePage(page: SimplePageValue): void {
      if (typeof page === "number" && page !== this.unsyncedPage) {
        this.unsyncedPage = page;
        this.syncedPage = this.unsyncedPage;
        this.$emit("change", this.unsyncedPage, this.unsyncedSize);
      }
    },
    /**
     * @description: 上一页
     * @author: Quarter
     * @return
     */
    previousPage(): void {
      if (this.unsyncedPage > 1) {
        this.changePage(this.unsyncedPage - 1);
      }
    },
    /**
     * @description: 下一页
     * @author: Quarter
     * @return
     */
    nextPage(): void {
      if (this.unsyncedPage < this.maxPageNumber) {
        this.changePage(this.unsyncedPage + 1);
      }
    },
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
    },
  },
});
</script>

<style lang="scss">
.simple-pagination {
  .page-size .simple-select .select-input {
    font-size: 12px;
  }

  .go-page .simple-input .input-content input {
    text-align: center;
  }
}
</style>

<style lang="scss">
.simple-pagination {
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