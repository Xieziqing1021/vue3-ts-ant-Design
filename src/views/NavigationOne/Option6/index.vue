<template>
    <div>
        <a-table 
            :columns="columns" 
            :data-source="newResultDara"
            :loading="listLoading"
            :pagination=false
            row-key="id"
            :scroll="{x: true }"
            :show-sorter-tooltip="false">
            <template #headerCell="{ column }">
              <template v-if="column.key === 'name'">
                <span>
                  <smile-outlined />
                  Name
                </span>
              </template>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'price'">
                <a-tag color="blue">
                  {{ record.price }}
                </a-tag>
              </template>
              <template v-if="column.key === 'picture'">
                <span>
                  <img :src="record.picture" alt="" width="100">
                </span>
              </template>
              <template v-if="column.key === 'operation'">
                <a-button type="primary" danger ghost @click="openDetail(record.id)">详情</a-button>
                <!-- <router-link
                :to="{ name:'operation7' , params:{id:record.id }}"
              > {{ '详情' }}</router-link> -->
              </template>
            </template>
          </a-table>
    </div>
</template>
<script lang="tsx" setup>
    import http from '@/utils/request';
    import { onMounted, ref } from 'vue';
    import {ApiRes,newResult,Good} from '@/types/data'
    import { useRouter, useRoute } from 'vue-router'
    import { SmileOutlined} from '@ant-design/icons-vue';
    const router = useRouter()
    const route = useRoute()


    const  listLoading = ref(false)
    const newResultDara = ref()
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '产品名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '产品图',
        dataIndex: 'picture',
        key: 'picture',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '产品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '操作',
        key: 'operation',
        // dataIndex: 'operation',
        align: 'center',

      },

    ];
    //获取列表数据
    const getNewSimple = ()=>{
        http.get<ApiRes<newResult>>('/home/new/simple').then((res)=>{
            console.log(res.data.result.newProduct);
            newResultDara.value = res.data.result.newProduct
        })
    }
    //获取商品详情
    const getGoodsInfo = async(id:string)=>{
      const res = await http.get('/goods',{
        params:{
          id,
        }
      })
    }
    //点击详情跳转至option7
    const openDetail = async(id:string)=>{
      // console.log(id,'点击了');
      const res = await http.get('/goods',{
        params:{
          id,
        }
      })
      const query ={
        id:id
      }
      // console.log(res,);
      router.push({name:'option7',query:{id:10}})
      
    }


    onMounted(()=>{
        getNewSimple()
    })

</script>
<style scoped lang="less">
    

</style>