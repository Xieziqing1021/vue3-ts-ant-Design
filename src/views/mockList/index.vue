<template>

   <div class="site">
    <a-button class="ml" @click="download" type="primary">点击事件</a-button>
    <a-button class="ml" @click="go('login')" type="primary">login</a-button>
    <a-button class="ml" @click="go('table')" type="primary">table</a-button>
    <a-button @click="go('layout')" type="primary">layout</a-button>
   </div>
</template>
<script setup lang="ts">
    import http  from '@/utils/request';
    import { onMounted, ref } from 'vue';
    import { riskDatum, pieDataType} from '@/types/mock'
    import router from '@/router';


    const operationalData = ref<riskDatum[]>([])
    const pieData = ref<pieDataType>()
    const geTabList = ()=>{
        // http({url:'http://localhost:9077/data'}).then((res)=>{
        //     operationalData.value = res.data 

        //     //饼图数据
        //     pieData.value = res.data.map((item:riskDatum) => ({
        //         value: (item.network.total + item.capacity.total + (item.core.total) + (item.fd.total) + (item.middleware.total) + (item.monitor.total) + (item.dbalert.total) + (item.degradation.total) + (item['依赖异常'].total)),
        //         name: (item.prd_line),
        //     }))
        //     console.log(pieData.value );
        // })
    }
    //下载表格数据
    const formatData = () => {

        const riskListDataFormat = operationalData.value.map((item:riskDatum) => ({
            prd_line: `${item.prd_line}`,
            network: ` 未开始：${item.network.not_start.total},进行中：${item.network.donging.total},已完成：${item.network.done.total},已逾期:${item.network.overdue.total}`,
            capacity: ` 未开始：${item.capacity.not_start.total},进行中：${item.capacity.donging.total},已完成：${item.capacity.done.total},已逾期:${item.capacity.overdue.total}`,
            core: ` 未开始：${item.core.not_start.total},进行中：${item.core.donging.total},已完成：${item.core.done.total},已逾期:${item.core.overdue.total}`,
            fd: ` 未开始：${item.fd.not_start.total},进行中：${item.fd.donging.total},已完成：${item.fd.done.total},已逾期:${item.fd.overdue.total}`,
            middleware: ` 未开始：${item.middleware.not_start.total},进行中：${item.middleware.donging.total},已完成：${item.middleware.done.total},已逾期:${item.middleware.overdue.total}`,
            monitor: ` 未开始：${item.monitor.not_start.total},进行中：${item.monitor.donging.total},已完成：${item.monitor.done.total},已逾期:${item.monitor.overdue.total}`,
            dbalert: ` 未开始：${item.dbalert.not_start.total},进行中：${item.dbalert.donging.total},已完成：${item.dbalert.done.total},已逾期:${item.dbalert.overdue.total}`,
            degradation: ` 未开始：${item.degradation.not_start.total},进行中：${item.degradation.donging.total},已完成：${item.degradation.done.total},已逾期:${item.degradation.overdue.total}`,
            依赖异常: ` 未开始：${item['依赖异常'].not_start.total},进行中：${item['依赖异常'].donging.total},已完成：${item['依赖异常'].done.total},已逾期:${item['依赖异常'].overdue.total}`,
        }))
        return riskListDataFormat.map((item: {[key: string]: any}) => Object.keys(item).map((key: keyof typeof item) => item[key]))
    }
    const download =()=>{
        const data = formatData()
        // console.log(data);
        
    }
    const go = (val:string)=>{
        if(val === 'login'){
            router.push('/login')
        }else if (val === 'table'){
            router.push('/table')
        }else if(val === 'layout'){
            router.push('/')
        }else{
            return
        }
    }

    onMounted(()=>{
        geTabList()
    })
</script>

<style lang="less">
    @import '@/assets/styles/mixins.css';

    .site{
        display: flex;
        flex-direction: column;
    }
    .info-header {
        position: relative;
        height: 30px;
        line-height: 30px;
        color: @baseColor;
        margin-bottom: 10px;
    }
    .title{
        position: absolute;
        left: 0;
        top: 0px;
        padding-right: 10px;
        color: #5D6E82;
        font-weight: bold;
        background-color: white;
    }
    .line{

        display: block;
        width: 100%;
        height: 1px;
        background-color: #ececec;
    }
    .mb10{
        margin-bottom: 10px;
    }

    .relative{
        position: relative;
    }
    .f16{
        font-size: 16px;
    }
</style>


