<template>
  <div  class="flex-space-between">

    <div class="echartsBox">
        223424
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { CheckCircleOutlined ,ExclamationCircleOutlined} from '@ant-design/icons-vue';
  import {pieDataType} from '@/types/pie'
  

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