<template>
  <div class="flex-space-between box-app">
    <div>
      <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
      <a-tree
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="gData"
        @expand="onExpand"
      >
        <template #title="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </div>
    <div>
    <a-tree 
        v-model:selectedKeys="selectedKeys" 
        :tree-data="treeData" 
        show-icon 
        default-expand-all>
      <template #switcherIcon="{ switcherCls }">
        <down-outlined :class="switcherCls" />
      </template>
      <template #icon="{ key, selected }">
        <template v-if="key === '0-0'">
        <span slot="0" class="tree-mark-icon" style="border: 1px solid #d48806; color: #d48806">
          <span class="font">C</span>
        </span>
        </template>
        <template v-else-if="key === '0-0-0'"> 
          <smile-outlined />
        </template>
        <template v-else>
          <frown-filled v-if="selected" />
          <frown-outlined v-else />
        </template>
      </template>
    </a-tree>
  </div>
  </div>
  
  <div>
      <!-- nodeType 0  不同等级图标颜色不一致-->
      <span slot="0" class="tree-mark-icon" style="border: 1px solid #d48806; color: #d48806">
        <span class="font">C</span>
      </span>
      <!-- nodeType 1 -->
      <span slot="1" class="tree-mark-icon" style="border: 1px solid #d48806; color: #d48806">
        <span class="font">P</span>
      </span>
      <!-- nodeType 2 -->
      <span slot="2-1" class="tree-mark-icon" style="border: 1px solid #52c41a; color: #52c41a">
        <span class="font">B</span>
      </span>
      <span slot="2-2" class="tree-mark-icon" style="border: 1px solid #52c41a; color: #52c41a">
        <span class="font">S</span>
      </span>
      <!-- nodeType 3 -->
      <span slot="3-1" class="tree-mark-icon" style="border: 1px solid #13c2c2; color: #13c2c2">
        <span class="font">A</span></span>
      <span slot="3-2" class="tree-mark-icon" style="border: 1px solid #13c2c2; color: #13c2c2">
        <span class="font">SS</span>
      </span>
      <!-- nodeType 4 -->
      <span slot="4-1" class="tree-mark-icon" style="border: 1px solid #85a5ff; color: #85a5ff">
        <span class="font">RA</span>
      </span>
      <span slot="4-2" class="tree-mark-icon" style="border: 1px solid #85a5ff; color: #85a5ff">
        <span class="font">RS</span>
      </span>
      <span slot="4-3" class="tree-mark-icon" style="border: 1px solid #85a5ff; color: #85a5ff">
        <span class="font">SA</span>
      </span>
      <!-- nodeType 5 -->
      <span slot="5" class="tree-mark-icon" style="border: 1px solid #ff85c0; color: #ff85c0">
        <span class="font">U</span>
      </span>
  </div>

</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { TreeProps } from 'ant-design-vue';
//=---
import { DownOutlined, SmileOutlined, FrownOutlined, FrownFilled ,PlayCircleOutlined} from '@ant-design/icons-vue';
const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      { title: 'leaf1', key: '0-0-0' },
      { 
        title: 'leaf3', 
        key: '0-0-2' ,
        children: [
          { title: 'leaf81', key: '0-1-3' },
          { title: 'leaf9', key: '0-1-4' },
        ], 
      },
      { title: 'leaf4', key: '0-0-3' },
      { title: 'leaf5', key: '0-0-4' },
      { title: 'leaf6', key: '0-0-5' },
      { title: 'leaf7', key: '0-0-6' },
      { 
        title: 'leaf2', 
        key: '0-0-1',
        children: [
          { title: 'leaf8', key: '0-1-1' },
          { title: 'leaf91', key: '0-1-2' },
        ], 
      },

    ],
  },
];

const selectedKeys= ref(['0-0-0'])

//========可搜索的树

const x = 3;
const y = 2;
const z = 1;
const genData: TreeProps['treeData'] = [];

// const generateData = (_level: number, _preKey?: string, _tns?: TreeProps['treeData']) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || genData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);

const dataList: TreeProps['treeData'] = [];
const generateList = (data: TreeProps['treeData']) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(genData);

// const getParentKey = (
//   key: string | number,
//   tree: TreeProps['treeData'],
// ): string | number | undefined => {
//   let parentKey;
//   for (let i = 0; i < tree.length; i++) {
//     const node = tree[i];
//     if (node.children) {
//       if (node.children.some(item => item.key === key)) {
//         parentKey = node.key;
//       } else if (getParentKey(key, node.children)) {
//         parentKey = getParentKey(key, node.children);
//       }
//     }
//   }
//   return parentKey;
// };

const expandedKeys = ref<(string | number)[]>([]);
  const searchValue = ref<string>('');
  const autoExpandParent = ref<boolean>(true);
  const gData = ref<TreeProps['treeData']>(genData);

  const onExpand = (keys: string[]) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };
  gData.value = treeData

  watch(searchValue, value => {
    const expanded = dataList
    //   .map((item: TreeProps['treeData'][number]) => {
    //     if (item.title.indexOf(value) > -1) {
    //       return getParentKey(item.key, gData.value);
    //     }
    //     return null;
    //   })
    //   .filter((item, i, self) => item && self.indexOf(item) === i);
    // expandedKeys.value = expanded;
    searchValue.value = value;
    autoExpandParent.value = true;


  
  });

</script>
<style lang="less">
  .box-app{
    width: 700px;
  }

  .tree-mark-icon{
    width: 18px;
    height: 18px;
    border-radius: 16px;
    font-size: 12px;
    display: inline-block;
    line-height: 16px;
    text-align: center;
    vertical-align: 2px;
      .font{
    
        display: inline-block;
        transform: scale(.85);
      }
  }
</style>


