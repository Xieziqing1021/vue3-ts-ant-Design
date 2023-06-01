<script lang="ts" setup name="login">
  import { ref ,watch} from 'vue';
  import type { Dayjs} from 'dayjs';
  import dayjs from 'dayjs';
  import router from '@/router';


  //全局
  const timeRanges = ref<{ [range: string]: Dayjs[] } | { [range: string]: () => Dayjs[] }>({})
  type RangeValue = [Dayjs, Dayjs];
  const value2 = ref<RangeValue>()
  const zoom = ref('小')

  // 点击按钮跳转
  const  go = (val:string)=>{
    if(val === 'layout'){
      router.push('/')
    }else if (val === 'mockList') {
      router.push('/mockList')
    }else if (val === 'table'){
      router.push('/table')
    }else{
      return
    }
  }
  //添加快捷选择时间
  const timeRangeHandleOpen = ()=>{
    timeRanges.value = {
      '5分钟': [dayjs().subtract(5, 'm'), dayjs()], '15分钟': [dayjs().subtract(15, 'm'), dayjs()], '30分钟': [dayjs().subtract(30, 'm'), dayjs()], '1小时': [dayjs().subtract(1, 'h'), dayjs()], '2小时': [dayjs().subtract(2, 'h'), dayjs()],
      '1月': [dayjs().subtract(1, 'M'), dayjs()],'2月': [dayjs().subtract(2, 'M'), dayjs()],
    }
    // console.log([dayjs().subtract(5, 'm'), dayjs()]);
  
  }
  //时间选这群改变时的回调
  const cc = ()=>{
    console.log(1);
    
  }




</script>
<template>
  <div>login组件</div>
  <div class="time">
    <a-space direction="vertical" :size="12">
      <a-range-picker v-model:value="value2" 
        show-time 
        :ranges="timeRanges"
        @openChange="timeRangeHandleOpen"
        @change="cc"
      />
  </a-space>
  <br><br>
  <a-button class="ml" @click="go('mockList')" type="primary">mockList</a-button><br>
  <a-button class="ml" @click="go('table')" type="primary">table</a-button><br>
  <a-button class="ml" @click="go('layout')" type="primary">layout</a-button>
  </div>
  <!-- <div v-if="zoom === '大'">
    <img style="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-out;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=2000&amp;hei=2000&amp;fmt=jpeg&amp;qlt=90&amp;.v=1660803972361" width="653" height="653" @click="zoom ='小'">
  </div>
  <div v-else>
    <img style="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=2000&amp;hei=2000&amp;fmt=jpeg&amp;qlt=90&amp;.v=1660803972361" width="326" height="326" @click="zoom = '大'">
  </div> -->
  </template>

<style lang="less" scoped>
    .time{
      // height: 600px;
      width: 600px;
      text-align: center;
    }
</style>



