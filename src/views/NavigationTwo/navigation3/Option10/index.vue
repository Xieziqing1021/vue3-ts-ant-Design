<template>
    <a-select
      v-model:value="value"
      style="width: 300px" 
      :options="items"
      class="dropdown-class-name" 
      placeholder="请选择" 
      :open="open"
      @blur="false"
      @select="selectOption" 
      @click="openFn"
      allow-clear
      :filter-option="MSelectFilterOption"
      show-search
    >
      <template #dropdownRender="{ menuNode: menu }" @click="(e) => {e.stopPropagation()}">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0" />
        <div style="padding: 4px 8px;cursor: pointer" class="flex-space-between">
            <a-input v-model:value.trim="inputval" ref="inputRef" placeholder="请输入" class="inputStyle" allowClear  />
            <div
                style="padding: 4px 8px; cursor: pointer"
                @click="addItem"
            >
                <plus-outlined />
                Add item
            </div>
        </div>
    </template>
</a-select>
    <div v-show="!open" class="select_overlap" @mouseup="openSelect">9090909</div>
  </template>
  <script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import {pieDataType} from '@/types/pie'
  let index = 0
  const open = ref(false)
  const items = ref<any>([]);
    const value = ref(undefined);
    const inputval = ref<string>('')
    const inputRef = ref()
    const openFn = ()=>{
        open.value = !open.value
    }
    const addItem = () => {
        if(inputval.value){
            console.log(inputval.value);
            items.value.unshift({
            value:inputval.value,
            label:inputval.value})
            inputval.value = ''

        }else{
            inputRef.value.focus()
            return
        }
    }
    // @ts-ignore
    const VNodes = (_ : any, { attrs }) => {
            return attrs.vnodes;
    }
    const  selectOption=()=> {
            // 单选时设置
            open.value = false
    }
    const openSelect=() =>{
        open.value = !open.value
    }
    const  MSelectFilterOption =(input :any, option:any) =>{
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    const getoptions = ()=>{
        setTimeout(()=>{
            items.value = [
                { value: 'ads', label: 'ads' },
                { value: 'base', label: 'base' },
                { value: 'devops', label: 'devops' },
                { value: 'fulishe', label: 'fulishe' },
                { value: 'live', label: 'live' },
                { value: 'rec', label: 'rec' },
                { value: 'search', label: 'search' },
                { value: 'shequ', label: 'shequ' },
            ] 
        },200)
    }

    onMounted(()=>{
        getoptions()
    })
</script>
<style scoped lang="less">
.dropdown-class-name{
    position: relative;
    // width: 100px;
    // height: 100px;
    // background-color: red;
}
.inputStyle{
    // position: relative;
    // background-color: red;
    width: 170px;
}
.select_overlap{
    position: absolute;
    top: 90;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: red;
    box-shadow: @boxShowShadow;
}
.flex-space-between{
    display: flex;
    justify-content: space-between;
}
</style>
  
  