  <template>
    <div class="mian-list-box ">
      <div class="mian-box">
        <a-button class="ml" @click="go('login')" type="primary">login</a-button>
        <a-button class="ml" @click="go('mockList')" type="primary">mockList</a-button>
        <a-button class="ml" @click="go('layout')" type="primary">layout</a-button>
        <div class="table-box">
          <a-table 
            :columns="columns" 
            :data-source="categorySon"
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
              <!-- <router-link
                :to="{ name:'operation7' , params:{id:record.id }}"
              > {{ '详情' }}</router-link> -->
              <a-button type="primary" danger ghost @click="openDetail(record.id)">详情</a-button>

              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  
  </template>
  <script lang="ts" setup name="layout">
    import useStore from '@/store';
    import http from '@/utils/request';
    import { onMounted, ref } from 'vue';
    import {ApiRes,Result,Good} from '@/types/data'
    import { SmileOutlined} from '@ant-design/icons-vue';
    import {useRoute , useRouter} from 'vue-router'

    // const {user} = useStore()
    const router = useRouter()
    //答应仓库里的数据
    // console.log(user.count);

    //全局
    const category = ref<Result[]>([])
    const categorySon = ref<any>([])
    const listLoading = ref<boolean>(false)

    const getAllCategory =()=>{
      http.get<ApiRes<Result[]>>('/home/category/head').then((res)=>{
  
        category.value = res.data.result
        // console.log(category.value)
        // console.log(res);
        // console.log(categorySon.value);
        categorySon.value = category.value.map((item)=>{
          return item 
        })
        // console.log(categorySon.value);
      })
    }
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
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        align: 'center',
      },

    ];

        //点击打开弹框看产品详情
    const openDetail = async(id:string)=>{
      console.log(id,'点击了');
      const res = await http.get('/goods',{
        params:{
          id,
        }
      })
      const query ={
        id,
      }
      console.log(res,);
      // router.push({name:'option7',query:{id:10}})
      
    }
    const  go = (val:string)=>{
      if(val === 'login'){
        router.push('/login')
      }else if (val === 'mockList') {
        router.push('/mockList')
      }else if(val === 'layout'){
        router.push('/')
      }else{
        return
      }
    }
    onMounted(()=>{
      getAllCategory()
    })
  
  </script>
  <style lang="less" scoped>
  .mian-list-box {
    display :flex ;
    padding: 10px 10px ;
    height:100% ;
    .mian-box{
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      width: 0;
  
      .table-box{
        flex: 1 1 auto;
        padding: 15px 15px 0 15px;
        background-color: white;
        border-radius: 5px;
        box-shadow: @boxShowShadow;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
  
  
  </style>
  <style lang="less">
    body{
    background-color: #edf2f9;
  }
  </style>
  
    
  
  
  