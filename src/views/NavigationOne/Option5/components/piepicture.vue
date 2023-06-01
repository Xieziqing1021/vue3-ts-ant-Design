<template>
    <!-- <div class="echartsBox">
    </div> -->
    <div
      id="mainLine"
      class="echarts"
    />
    <!-- <div v-if="one === true">
        hhhhh
    </div>
    <div v-else>
        xixixi
    </div> -->
  </template>
  <script lang="ts" setup>
    import * as echarts from 'echarts/core';
    import {
        TooltipComponent,
        TooltipComponentOption
    } from 'echarts/components';
    import {
        GaugeChart,
        GaugeSeriesOption
    } from 'echarts/charts';
    import {
        CanvasRenderer
    } from 'echarts/renderers';
    import { onMounted, ref, toRefs, watch } from 'vue';
    import { debounce } from 'lodash'
    import {pieDataType} from '@/types/pie'

    const props = withDefaults(defineProps<{
        pieData: pieDataType[]
    }>(), {
    })
    const one = ref<boolean>(false)
    echarts.use(
        [TooltipComponent, GaugeChart, CanvasRenderer]
    );
  
    let pieCharts: any = null
    const initpie = () => {
      const el = document.getElementById('mainLine') as HTMLElement
      const pieOption =ref<any>({
        tooltip: {
          //formatter: '{a} <br/>{b} : {c}%',
            formatter(data:any) {
                return (`${data.marker}${data.name} - ${data.value}
                </br>${data.marker}性能: ${data.data.datas[0].overdue}
                </br>${data.marker}发现${data.data.datas[0].not_start}个问题:${data.data.datas[0].height}`
                )
            },
        },
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.6, '#FF6E76'],
                  [0.8, '#FDDD60'],
                  [0.95, '#58D9F9'],
                  [1, '#7CFFB2']
                ]
              }
            },
            //指针样式
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5
              }
            },
            axisLabel: {
              color: '#464646',
            //   fontSize: 20,
              distance: -65,
              formatter: function (value:number) {
                if (value === 30) {
                  return '极差';
                } else if (value === 70) {
                  return '及格';
                } else if ( value === 90) {
                  return '良好';
                } else if (value === 100) {
                  return '优秀';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
            //   fontSize: 30,
            },
            
            detail: {
            //   fontSize: 50,
              //offsetCenter: [0, '0%'],
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value:number) {
                return Math.round(value) + '分';
              },
      
              color: 'auto'
            },
            data: props.pieData //传输数据
          }
        ]
      }) 
      if (!pieCharts) pieCharts = echarts.init(el)
        pieCharts.setOption(pieOption.value, true)
        //点击事件
        pieCharts.on('click', function (param:any) {
        //   console.log(param,'点击事件');
        //   console.log(param.data.value);
            one.value = !one.value
          
        })
    }
    const { pieData} = toRefs(props)
    watch([pieData], () => {
      initpie()
    })
  
    onMounted(() => {
      initpie()
      // 防抖
      window.addEventListener('resize', debounce(() => {
        pieCharts.resize()
      }, 200))
    })
  
  
  
  
  
  </script>
  <style scoped lang="less">
    .echarts{
      width: 100%;
      height: 100%;
    }

  </style>
  
  
  
  
  