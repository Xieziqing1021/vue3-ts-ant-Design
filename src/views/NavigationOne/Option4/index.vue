<template>
    <a-card size="small" title="基础信息" class="mb10">
        <div class="flex-space-between">
            <a-descriptions>
                <a-descriptions-item label="话题内容"> 我的萌宠</a-descriptions-item>
                <a-descriptions-item label="话题下笔记数量">230</a-descriptions-item>
            </a-descriptions>
            <a-button>复制话题ID</a-button>
        </div>
    </a-card>
    <a-card size="small" title="话题笔记">
      <div class="flex-space-between">
        <div class="mb10">
          <a-button type="primary" ghost>最新</a-button>
          <a-button>最热</a-button>
        </div>
        <div>
        <!-- 复制操作 -->
          <a-input-group compact>
          <a-input v-model:value="code" id="copyVal"  style="width: 300px" />
          <a-tooltip title="copy git url">
            <a-button
            class="p3"
            @click="copys"
            data-clipboard-action="copy"
            data-clipboard-target="#copyVal">
              <template #icon><CopyOutlined /></template>
            </a-button>
          </a-tooltip>
        </a-input-group> 
        </div>
      </div>
        <a-table 
            :columns="columns" 
            :pagination="false" 
            :data-source="data">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'image'">
                  <span>
                  <img :src="record.image" alt="" width="100">
                </span>
                </template>
                <template v-if="column.key === 'time'">
                    {{ record.time }}
                </template>
                <template v-if="column.key === 'status'">
                    <div>安全：{{record.status.safety}}</div>
                    <div>商业：{{record.status.business}}</div>
                    <div>删除：{{record.status.del}}</div>
                    <div>私密状态：{{record.status.privacy}}</div>
                </template>
                <template v-if="column.key === 'action'">
                    <a-button type="primary" style="margin-bottom: 10px;">移交安全</a-button><br>
                    <!-- <a-button type="primary" @click="copy(source = record.id)" >复制话题ID</a-button> -->
                    <a-button type="primary" >复制话题ID</a-button>
                </template>
            </template>
        </a-table>
    </a-card>
</template>
<script  lang="ts" setup >
  import { CopyOutlined } from '@ant-design/icons-vue';
  //安装包复制方法
  import Clipboard from "clipboard";
  import { ref ,watch} from 'vue';
  //复制方法1 --- vueuse 使用 useClipboard 方法  copy 方法不传值默认是绑定的初始值，传值以后就是传递的值
  import { useClipboard } from '@vueuse/core'  
    //必须得定义source 字段
  const source = ref()
  const { text, copy, copied, isSupported } = useClipboard({source})
  watch(source,(val,ovl)=>{
    console.log(val);
      console.log(ovl);
      
  })

  

  const columns = [
    {
      title: '封面图片',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: '笔记内容',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '笔记状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];
  const data = [
    {
      key: '1',
      id:101,
      image: 'https://yanxuan-item.nosdn.127.net/9892cc73945da1591fa5259ad076b23c.jpg',
      text: '暖腰暖腹暖胃，蕲艾暖宫腰带',
      time: '2019-11-20',
      status:{
        safety:'人工通过',
        business:'非商业',
        del:'否',
        privacy:'公开',
      } ,
    },
    { 
      key: '2',
      id:102,
      image: 'https://yanxuan-item.nosdn.127.net/7d1bc78607a08c088b2a7cdbe88c05af.png',
      text: '七夕礼物·挺拔身姿，隐形内穿矫姿带',
      time: '2019-11-21',
      status:{
        safety:'人工通过',
        business:'非商业',
        del:'否',
        privacy:'公开',
      } ,
    },
    {
      key: '3',
      id:103,
      image: 'https://yanxuan-item.nosdn.127.net/941abaee58a88cb104228fe2c4cfdeb1.png',
      text: '艾灸理疗随时随地，灸疗装置8头/12头',
      time: new Date(),
      status:{
        safety:'人工通过',
        business:'非商业',
        del:'否',
        privacy:'公开',
      } ,
    },
  ];
  //复制方法2安装 clipboard  目前只实现Inpu 输入复制
  var clipboard = new Clipboard(".p3");
  const code = ref('学习')
  const copys = ()=>{
  // Clipboard复制方法
    var clipboard = new Clipboard(".p3");
    // console.log("插件", clipboard);
    clipboard.on("success", (e) => {
      // console.info("复制成功做的事情:", e.action);
      // console.info("复制成功的文本:", e.text);
      // console.info("复制成功触发:", e.trigger);
      e.clearSelection();
      // 释放内存
      clipboard.destroy();
    });
    clipboard.on("error", (e) => {
      // console.error("复制错误做的事情:", e.action);
      // console.error("复制错误触发:", e.trigger);
      // 不支持复制
      // 释放内存
      clipboard.destroy();
    });
    
  }



</script>

<style scoped lang="less">

</style>

  
  