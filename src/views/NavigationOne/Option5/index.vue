<template>
  <div  class="flex-space-between">

    <div class="echartsBox">
      <Piepicture
      :pieData="data">
      </Piepicture>
      <div :class="{mbn: 10>0}">  
        890000
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { CheckCircleOutlined ,ExclamationCircleOutlined} from '@ant-design/icons-vue';
  import Piepicture from './components/piepicture.vue'
  import {pieDataType} from '@/types/pie'
  const data = ref<pieDataType[]>( [
              {
                value: 10,
                name: '健康分',
                datas:[ 
                  { height: `问题是监控指标 'cpu_user'告警`,
                    not_start:7 , 
                    overdue: `异常`}]
      
              }
            ])
  

</script>

<style lang="less" scoped>
  .echartsBox{
    width: 600px;
    height: 600px;
  }
  .warningMessage{
    width: 600px;
    height: 500px;

  }
  .mbn{
    background-color: red;
    height: 100px;
    width: 100px;
  }
  .divider{
    position: absolute;
  }
  .check-circle{
    position: relative;
    top: 56px;
    left: -7px;
    height: 150px;
  }
  .exclamation-circle{
    position: relative;
    top: 106px; //上下间隔50
    left: -37px;
  }
  .descriptions{
    margin-top: 80px;
    margin-left: 15px;
  }
</style>