

<template>
    <div>
        <a-cascader
            v-model:value="value"
            :options="filterAppListData"
            placeholder="服务树"
            :show-search="{ filter }"
            style="min-width: 360px !important; width: auto !important"
            change-on-select
            @change="appHandleChange"
        />
    </div>
</template>


<script lang="ts" setup>
  import {
    ref, onMounted, watch, computed,
  } from 'vue'
  import {treeData} from './component/tree'
  import type { ShowSearchType } from 'ant-design-vue/es/cascader'

  
  const value = ref()
  const filterAppListData = ref<any[]>([])
  // 重构树结构
  const getNewtree = (data: any[], arr: any[]) => {
    data.forEach((item, index) => {
      if (item.child && item.child.length > 0 && item.node_type < 3) { 
        arr.push({ label: `${item.name}(${item.alias})`, value: item.name, children: [] })
        getNewtree(item.child, arr[index].children)
      } else {
        arr.push({ label: `${item.name}(${item.alias})`, value: item.name })
      }
    })
    return arr
  }
  const getList = () => { // 调请求获取数据
    setTimeout(()=>{
      const arr:any[] = []
      filterAppListData.value = getNewtree(treeData.data.child, arr)
      console.log(filterAppListData.value);
      
    })
    
  }
  const appHandleChange = (val: string | string[]) => {
    console.log(val);
    
  }
  const filter: ShowSearchType['filter'] = (inputValue, path) => path.some((option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)


  onMounted(() => {
    getList()
  })
</script>