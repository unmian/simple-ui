<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 14:47:55
 * @Description: 树形组件文档
 * @FilePath: /simple-ui/documents/views/TreeDocument.vue
-->
<template>
  <div class="tree-document">
    <document-page title="树形组件 SimpleTree" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的树形组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>props</td>
            <td>否</td>
            <td>SimpleTreeProp</td>
            <td>否</td>
            <td>[]</td>
            <td>-</td>
            <td>树形结构参数配置</td>
          </tr>
          <tr>
            <td>data</td>
            <td>否</td>
            <td>object[]</td>
            <td>否</td>
            <td>[]</td>
            <td>-</td>
            <td>树形结构数据，其中每个节点的id都必须具有唯一性</td>
          </tr>
          <tr>
            <td>lazy</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否使用懒加载</td>
          </tr>
          <tr>
            <td>load</td>
            <td>否</td>
            <td>SimpleLazyLoad</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>懒加载节点调用方法</td>
          </tr>
          <tr>
            <td>show-checkbox</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示复选框</td>
          </tr>
          <tr>
            <td>linkage</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否联动选中</td>
          </tr>
          <tr>
            <td>select</td>
            <td>否</td>
            <td>SimpleIdentifier</td>
            <td>是</td>
            <td>-</td>
            <td>-</td>
            <td>选中的节点值</td>
          </tr>
          <tr>
            <td>can-select</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否可以选择条目</td>
          </tr>
          <tr>
            <td>init-expand</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否默认展开</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>select</td>
            <td>
              node: SimpleNodeConfig 节点
              <br />tree: SimpleNodeConfig[] 树形结构数据
            </td>
            <td>选择条目</td>
          </tr>
          <tr>
            <td>check</td>
            <td>
              node: SimpleNodeConfig 节点
              <br />tree: SimpleNodeConfig[] 树形结构数据
            </td>
            <td>勾选条目</td>
          </tr>
          <tr>
            <td>change</td>
            <td>
              value: SimpleIdentifier[]
              <br />node: SimpleNodeConfig 节点
            </td>
            <td>勾选变化</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div>
          <simple-tree :props="{ label: 'name' }" :data="data" show-checkbox linkage></simple-tree>
        </div>
        <div style="margin-top: 50px">
          <simple-tree :props="{ label: 'name' }" :data="data" can-select></simple-tree>
        </div>
        <div style="margin-top: 50px">
          <simple-tree :props="{ label: 'name' }" :data="lazyData" :load="loadLazyData" lazy expand></simple-tree>
        </div>
        <div style="margin-top: 50px">
          <simple-tree :props="{ label: 'name' }" :data="data" init-expand></simple-tree>
        </div>
        <div style="margin-top: 50px">
          <simple-tree :props="{ label: 'name' }" :data="data" init-expand>
            <template v-slot="{ node }">{{ node.label }}({{ node.level }})</template>
          </simple-tree>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import { SimpleNodeConfig } from "packages";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: "中华人民共和国",
          children: [
            {
              id: 11,
              name: "江苏省",
              checked: true,
              children: [
                {
                  id: 111,
                  name: "南京市",
                  children: [
                    {
                      id: 1111,
                      name: "秦淮区",
                    },
                    {
                      id: 1112,
                      name: "建邺区",
                    },
                    {
                      id: 1113,
                      name: "浦口区",
                    },
                    {
                      id: 1114,
                      name: "玄武区",
                    },
                    {
                      id: 1115,
                      name: "江宁区",
                    },
                    {
                      id: 1116,
                      name: "栖霞区",
                    },
                    {
                      id: 1117,
                      name: "溧水区",
                    },
                    {
                      id: 1118,
                      name: "高淳区",
                    },
                    {
                      id: 1119,
                      name: "雨花台区",
                    },
                    {
                      id: 1120,
                      name: "鼓楼区",
                    },
                    {
                      id: 1121,
                      name: "六合区",
                    },
                  ],
                },
                {
                  id: 112,
                  name: "南通市",
                },
                {
                  id: 113,
                  name: "扬州市",
                },
                {
                  id: 114,
                  name: "徐州市",
                },
                {
                  id: 115,
                  name: "泰州市",
                },
                {
                  id: 116,
                  name: "泰州市",
                },
                {
                  id: 117,
                  name: "宿迁市",
                },
                {
                  id: 118,
                  name: "淮安市",
                },
                {
                  id: 119,
                  name: "连云港市",
                },
                {
                  id: 120,
                  name: "苏州市",
                },
                {
                  id: 121,
                  name: "无锡市",
                },
                {
                  id: 122,
                  name: "常州市",
                },
                {
                  id: 123,
                  name: "镇江市",
                },
              ],
            },
            {
              id: 12,
              name: "安徽省",
            },
            {
              id: 13,
              name: "上海市",
            },
            {
              id: 14,
              name: "浙江省",
            },
          ],
        },
        {
          id: 2,
          name: "美利坚合众国",
        },
        {
          id: 3,
          name: "日本国",
        },
        {
          id: 4,
          name: "俄罗斯国",
        },
        {
          id: 5,
          name: "加拿大",
        },
      ],
      lazyData: [
        {
          id: 1,
          name: "中华人民共和国",
          isLeaf: false,
        },
        {
          id: 2,
          name: "美利坚合众国",
          isLeaf: true,
        },
        {
          id: 3,
          name: "日本国",
          isLeaf: true,
        },
        {
          id: 4,
          name: "俄罗斯国",
          isLeaf: true,
        },
        {
          id: 5,
          name: "加拿大",
          isLeaf: true,
        },
      ],
      code: `
<template>
  <div>
    <div>
      <simple-tree
        :props="{ label: 'name' }"
        :data="data"
        show-checkbox
        linkage
      ></simple-tree>
    </div>
    <div style="margin-top: 50px">
      <simple-tree
        :props="{ label: 'name' }"
        :data="data"
        can-select
      ></simple-tree>
    </div>
    <div style="margin-top: 50px">
      <simple-tree
        :props="{ label: 'name' }"
        :data="lazyData"
        :load="loadLazyData"
        lazy
        expand
      ></simple-tree>
    </div>
    <div style="margin-top: 50px">
      <simple-tree
        :props="{ label: 'name' }"
        :data="data"
        init-expand
      ></simple-tree>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TreeDocument extends Vue {
  // 树形结构数据
  private readonly data: any[] = [
    {
      id: 1,
      name: "中华人民共和国",
      children: [
        {
          id: 11,
          name: "江苏省",
          checked: true,
          children: [
            {
              id: 111,
              name: "南京市",
              children: [
                {
                  id: 1111,
                  name: "秦淮区",
                },
                {
                  id: 1112,
                  name: "建邺区",
                },
                {
                  id: 1113,
                  name: "浦口区",
                },
                {
                  id: 1114,
                  name: "玄武区",
                },
                {
                  id: 1115,
                  name: "江宁区",
                },
                {
                  id: 1116,
                  name: "栖霞区",
                },
                {
                  id: 1117,
                  name: "溧水区",
                },
                {
                  id: 1118,
                  name: "高淳区",
                },
                {
                  id: 1119,
                  name: "雨花台区",
                },
                {
                  id: 1120,
                  name: "鼓楼区",
                },
                {
                  id: 1121,
                  name: "六合区",
                },
              ],
            },
            {
              id: 112,
              name: "南通市",
            },
            {
              id: 113,
              name: "扬州市",
            },
            {
              id: 114,
              name: "徐州市",
            },
            {
              id: 115,
              name: "泰州市",
            },
            {
              id: 116,
              name: "泰州市",
            },
            {
              id: 117,
              name: "宿迁市",
            },
            {
              id: 118,
              name: "淮安市",
            },
            {
              id: 119,
              name: "连云港市",
            },
            {
              id: 120,
              name: "苏州市",
            },
            {
              id: 121,
              name: "无锡市",
            },
            {
              id: 122,
              name: "常州市",
            },
            {
              id: 123,
              name: "镇江市",
            },
          ],
        },
        {
          id: 12,
          name: "安徽省",
        },
        {
          id: 13,
          name: "上海市",
        },
        {
          id: 14,
          name: "浙江省",
        },
      ],
    },
    {
      id: 2,
      name: "美利坚合众国",
    },
    {
      id: 3,
      name: "日本国",
    },
    {
      id: 4,
      name: "俄罗斯国",
    },
    {
      id: 5,
      name: "加拿大",
    },
  ];
  private readonly lazyData: any[] = [
    {
      id: 1,
      name: "中华人民共和国",
      isLeaf: false,
    },
    {
      id: 2,
      name: "美利坚合众国",
      isLeaf: true,
    },
    {
      id: 3,
      name: "日本国",
      isLeaf: true,
    },
    {
      id: 4,
      name: "俄罗斯国",
      isLeaf: true,
    },
    {
      id: 5,
      name: "加拿大",
      isLeaf: true,
    },
  ];

  /**
   * @description: 异步加载节点
   * @author: Quarter
   * @param {SimpleNodeConfig} node 加载节点配置
   * @param {Function} resolve 回掉传入节点数据
   * @return
   */
  private loadLazyData(
    node: SimpleNodeConfig,
    resolve: (nodes: any) => void
  ): void {
    setTimeout(() => {
      if (node.id === 1) {
        resolve([
          {
            id: 11,
            name: "江苏省",
            isLeaf: false,
          },
          {
            id: 12,
            name: "安徽省",
            isLeaf: true,
          },
          {
            id: 13,
            name: "上海市",
            isLeaf: true,
          },
          {
            id: 14,
            name: "浙江省",
            isLeaf: true,
          },
        ]);
      } else if (node.id === 11) {
        resolve([
          {
            id: 111,
            name: "南京市",
            isLeaf: true,
          },
          {
            id: 112,
            name: "南通市",
            isLeaf: true,
          },
          {
            id: 113,
            name: "扬州市",
            isLeaf: true,
          },
          {
            id: 114,
            name: "徐州市",
            isLeaf: true,
          },
          {
            id: 115,
            name: "泰州市",
            isLeaf: true,
          },
          {
            id: 116,
            name: "泰州市",
            isLeaf: true,
          },
          {
            id: 117,
            name: "宿迁市",
            isLeaf: true,
          },
          {
            id: 118,
            name: "淮安市",
            isLeaf: true,
          },
          {
            id: 119,
            name: "连云港市",
            isLeaf: true,
          },
          {
            id: 120,
            name: "苏州市",
            isLeaf: true,
          },
          {
            id: 121,
            name: "无锡市",
            isLeaf: true,
          },
          {
            id: 122,
            name: "常州市",
            isLeaf: true,
          },
          {
            id: 123,
            name: "镇江市",
            isLeaf: true,
          },
        ]);
      } else {
        resolve([]);
      }
    }, 3000);
  }
}
</${"script"}>
      `,
    };
  },
  methods: {
    /**
     * @description: 异步加载节点
     * @author: Quarter
     * @param {SimpleNodeConfig} node 加载节点配置
     * @param {Function} resolve 回掉传入节点数据
     * @return
     */
    loadLazyData(node: SimpleNodeConfig, resolve: (nodes: any) => void): void {
      setTimeout(() => {
        if (node.id === 1) {
          resolve([
            {
              id: 11,
              name: "江苏省",
              isLeaf: false,
            },
            {
              id: 12,
              name: "安徽省",
              isLeaf: true,
            },
            {
              id: 13,
              name: "上海市",
              isLeaf: true,
            },
            {
              id: 14,
              name: "浙江省",
              isLeaf: true,
            },
          ]);
        } else if (node.id === 11) {
          resolve([
            {
              id: 111,
              name: "南京市",
              isLeaf: true,
            },
            {
              id: 112,
              name: "南通市",
              isLeaf: true,
            },
            {
              id: 113,
              name: "扬州市",
              isLeaf: true,
            },
            {
              id: 114,
              name: "徐州市",
              isLeaf: true,
            },
            {
              id: 115,
              name: "泰州市",
              isLeaf: true,
            },
            {
              id: 116,
              name: "泰州市",
              isLeaf: true,
            },
            {
              id: 117,
              name: "宿迁市",
              isLeaf: true,
            },
            {
              id: 118,
              name: "淮安市",
              isLeaf: true,
            },
            {
              id: 119,
              name: "连云港市",
              isLeaf: true,
            },
            {
              id: 120,
              name: "苏州市",
              isLeaf: true,
            },
            {
              id: 121,
              name: "无锡市",
              isLeaf: true,
            },
            {
              id: 122,
              name: "常州市",
              isLeaf: true,
            },
            {
              id: 123,
              name: "镇江市",
              isLeaf: true,
            },
          ]);
        } else {
          resolve([]);
        }
      }, 3000);
    },
  },
});
</script>

<style lang="scss" scoped></style>
