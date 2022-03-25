<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-11 02:43:59
 * @Description: 下拉框文档
 * @FilePath: /simple-ui/documents/views/TreeSelectDocument.vue
-->
<template>
  <div class="tree-select-document">
    <document-page title="树形下拉框 SimpleTreeSelect" :code="code">
      <template v-slot:desc>
        <p>这是拥有更多自定义项的树形下拉框组件。</p>
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
            <td>SimpleSelectValue[] | SimpleSelectValue</td>
            <td>是</td>
            <td>[]</td>
            <td>-</td>
            <td>下拉框的选中值</td>
          </tr>
          <tr>
            <td>props</td>
            <td>否</td>
            <td>SimpleTreeProp</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>节点树形配置</td>
          </tr>
          <tr>
            <td>data</td>
            <td>否</td>
            <td>Object[]</td>
            <td>否</td>
            <td>[]</td>
            <td>-</td>
            <td>选项树形数据</td>
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
            <td></td>
            <td></td>
            <td>下拉框弹出层自定义类名</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>
              value: SimpleSelectValue[]|SimpleSelectValue 下拉框的值
              <br />item:
              SimpleSelectValue 当前选中的值
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
              <simple-tree-select
                width="240px"
                :props="{ id: 'value', label: 'name' }"
                :data="selectData"
              ></simple-tree-select>
            </li>
            <li>
              <simple-tree-select
                width="240px"
                :props="{ id: 'value', label: 'name' }"
                :data="selectData"
                value="02"
                clearable
              ></simple-tree-select>
            </li>
            <li>
              <simple-tree-select
                width="240px"
                :props="{ id: 'value', label: 'name' }"
                :data="selectData"
                disabled
              ></simple-tree-select>
            </li>
            <li>
              <simple-tree-select
                width="240px"
                :props="{ id: 'value', label: 'name' }"
                :data="selectData"
                readonly
              ></simple-tree-select>
            </li>
            <li>
              <simple-tree-select
                width="240px"
                :props="{ id: 'value', label: 'name' }"
                :data="selectData"
                multiple
              ></simple-tree-select>
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

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      selectData: [ // 下拉数据
        {
          name: "数据看板",
          value: "01",
        },
        {
          name: "统计分析",
          value: "02",
        },
        {
          name: "系统配置管理",
          value: "03",
          children: [
            {
              name: "用户管理",
              value: "04",
              children: [
                {
                  name: "新增按钮",
                  value: "05",
                },
                {
                  name: "编辑按钮",
                  value: "06",
                },
                {
                  name: "删除按钮",
                  value: "07",
                },
              ],
            },
            {
              name: "权限管理",
              value: "08",
            },
            {
              name: "角色管理",
              value: "09",
            },
            {
              name: "日志管理",
              value: "10",
            },
          ],
        },
      ],
      code: `
<template>
  <div>
    <simple-tree-select
      width="240px"
      :props="{ id: 'value', label: 'name' }"
      :data="selectData"
    ></simple-tree-select>
    <simple-tree-select
      width="240px"
      :props="{ id: 'value', label: 'name' }"
      :data="selectData"
      value="02"
      clearable
    ></simple-tree-select>
    <simple-tree-select
      width="240px"
      :props="{ id: 'value', label: 'name' }"
      :data="selectData"
      disabled
    ></simple-tree-select>
    <simple-tree-select
      width="240px"
      :props="{ id: 'value', label: 'name' }"
      :data="selectData"
      readonly
    ></simple-tree-select>
    <simple-tree-select
      width="240px"
      :props="{ id: 'value', label: 'name' }"
      :data="selectData"
      multiple
    ></simple-tree-select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

${"export default Vue.extend"}({
  components: {
    DocumentPage,
  },
  data() {
    return {
      selectData: [ // 下拉数据
        {
          name: "数据看板",
          value: "01",
        },
        {
          name: "统计分析",
          value: "02",
        },
        {
          name: "系统配置管理",
          value: "03",
          children: [
            {
              name: "用户管理",
              value: "04",
              children: [
                {
                  name: "新增按钮",
                  value: "05",
                },
                {
                  name: "编辑按钮",
                  value: "06",
                },
                {
                  name: "删除按钮",
                  value: "07",
                },
              ],
            },
            {
              name: "权限管理",
              value: "08",
            },
            {
              name: "角色管理",
              value: "09",
            },
            {
              name: "日志管理",
              value: "10",
            },
          ],
        },
      ],
    };
  },
});
</${"script"}>
      `,
    };
  },
});
export class TreeSelectDocument extends Vue {
  // 示例代码
  private readonly code: string = `
    
  `;
}
</script>

<style lang="scss" scoped>
.tree-select-document {
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