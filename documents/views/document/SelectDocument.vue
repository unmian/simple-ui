<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:01:14
 * @Description: 下拉框文档
 * @FilePath: /simple-ui/documents/views/SelectDocument.vue
-->
<template>
  <div class="select-document">
    <document-page title="下拉框 Select" :code="code">
      <template v-slot:desc>
        <p>这是拥有更多自定义项的下拉框组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>组件的宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>组件的高度</td>
          </tr>
          <tr>
            <td>list-height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>200px</td>
            <td>-</td>
            <td>列表的最大高度</td>
          </tr>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>SelectValue[] | SelectValue</td>
            <td>是</td>
            <td>[]</td>
            <td>-</td>
            <td>下拉框的选中值</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否多选</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>请选择</td>
            <td>-</td>
            <td>提示文字</td>
          </tr>
          <tr>
            <td>show-arrow</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>true</td>
            <td>true/false</td>
            <td>是否显示箭头</td>
          </tr>
          <tr>
            <td>hide-arrow</td>
            <td>否</td>
            <td>Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否隐藏弹窗箭头</td>
          </tr>
          <tr>
            <td>filter</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否可以筛选</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否可以清除</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否禁用</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否只读</td>
          </tr>
          <tr>
            <td>special-class</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>下拉框弹出层自定义类名</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>
              value: SelectValue[]|SelectValue 下拉框的值
              <br />item: SelectValue
              当前选中的值
            </td>
            <td>下拉框变化</td>
          </tr>
          <tr>
            <td>clear</td>
            <td>-</td>
            <td>清空下拉框</td>
          </tr>
          <tr>
            <td>expand</td>
            <td>-</td>
            <td>展开下拉框</td>
          </tr>
          <tr>
            <td>close</td>
            <td>-</td>
            <td>关闭下拉框</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-select width="240px">
                <s-option value="中国大陆">中国大陆</s-option>
                <s-option value="香港特别行政区">香港特别行政区</s-option>
                <s-option value="澳门特别行政区">澳门特别行政区</s-option>
                <s-option value="台湾">台湾</s-option>
              </s-select>
            </li>
            <li>
              <s-select width="240px" placeholder="可以搜索的下拉框" filter clearable>
                <s-option value="中国大陆">中国大陆</s-option>
                <s-option value="香港特别行政区">香港特别行政区</s-option>
                <s-option value="澳门特别行政区">澳门特别行政区</s-option>
                <s-option value="台湾">台湾</s-option>
              </s-select>
            </li>
            <li>
              <s-select width="240px" placeholder="多选下拉框" multiple>
                <s-option value="中国大陆">中国大陆</s-option>
                <s-option value="香港特别行政区">香港特别行政区</s-option>
                <s-option value="澳门特别行政区">澳门特别行政区</s-option>
                <s-option value="台湾">台湾</s-option>
              </s-select>
            </li>
            <li>
              <s-select width="240px" placeholder="可以清除的下拉框" value="香港特别行政区" clearable>
                <s-option value="中国大陆">中国大陆</s-option>
                <s-option value="香港特别行政区">香港特别行政区</s-option>
                <s-option value="澳门特别行政区">澳门特别行政区</s-option>
                <s-option value="台湾">台湾</s-option>
              </s-select>
            </li>
            <li>
              <s-select width="240px" placeholder="禁用的下拉框" disabled>
                <s-option value="中国大陆">中国大陆</s-option>
                <s-option value="香港特别行政区">香港特别行政区</s-option>
                <s-option value="澳门特别行政区">澳门特别行政区</s-option>
                <s-option value="台湾">台湾</s-option>
              </s-select>
            </li>
            <li>
              <s-select width="240px" placeholder="只读的下拉框" readonly>
                <s-option value="中国大陆">中国大陆</s-option>
                <s-option value="香港特别行政区">香港特别行政区</s-option>
                <s-option value="澳门特别行政区">澳门特别行政区</s-option>
                <s-option value="台湾">台湾</s-option>
              </s-select>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "SelectDocument",
  components: {
    DocumentPage,
  },
})
export default class SelectDocument extends Vue {
  code = `
<div>
  <ul>
    <li>
      <s-select width="240px">
        <s-option value="中国大陆">中国大陆</s-option>
        <s-option value="香港特别行政区">香港特别行政区</s-option>
        <s-option value="澳门特别行政区">澳门特别行政区</s-option>
        <s-option value="台湾">台湾</s-option>
      </s-select>
    </li>
    <li>
      <s-select width="240px" placeholder="可以搜索的下拉框" filter clearable>
        <s-option value="中国大陆">中国大陆</s-option>
        <s-option value="香港特别行政区">香港特别行政区</s-option>
        <s-option value="澳门特别行政区">澳门特别行政区</s-option>
        <s-option value="台湾">台湾</s-option>
      </s-select>
    </li>
    <li>
      <s-select width="240px" placeholder="多选下拉框" multiple>
        <s-option value="中国大陆">中国大陆</s-option>
        <s-option value="香港特别行政区">香港特别行政区</s-option>
        <s-option value="澳门特别行政区">澳门特别行政区</s-option>
        <s-option value="台湾">台湾</s-option>
      </s-select>
    </li>
    <li>
      <s-select width="240px" placeholder="可以清除的下拉框" value="香港特别行政区" clearable>
        <s-option value="中国大陆">中国大陆</s-option>
        <s-option value="香港特别行政区">香港特别行政区</s-option>
        <s-option value="澳门特别行政区">澳门特别行政区</s-option>
        <s-option value="台湾">台湾</s-option>
      </s-select>
    </li>
    <li>
      <s-select width="240px" placeholder="禁用的下拉框" disabled>
        <s-option value="中国大陆">中国大陆</s-option>
        <s-option value="香港特别行政区">香港特别行政区</s-option>
        <s-option value="澳门特别行政区">澳门特别行政区</s-option>
        <s-option value="台湾">台湾</s-option>
      </s-select>
    </li>
    <li>
      <s-select width="240px" placeholder="只读的下拉框" readonly>
        <s-option value="中国大陆">中国大陆</s-option>
        <s-option value="香港特别行政区">香港特别行政区</s-option>
        <s-option value="澳门特别行政区">澳门特别行政区</s-option>
        <s-option value="台湾">台湾</s-option>
      </s-select>
    </li>
  </ul>
</div>
      `; // 示例代码
}
</script>

<style lang="scss" scoped>
.select-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-top: 20px;
      }
    }
  }
}
</style>