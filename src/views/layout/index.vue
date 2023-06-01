<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="state.collapsed" :trigger="null" collapsible>
    <div class="logo" />
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        @click="cliskMenuItem"
      >
        <a-menu-item key="/login">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>Login</span>
        </a-menu-item>
        <a-menu-item key="/table">
          <template #icon>
            <DesktopOutlined />
          </template>
          <span>Table</span>
        </a-menu-item>
        <a-menu-item key="/mockList">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>MockList</span>
        </a-menu-item>
        <a-sub-menu key="NavigationOne">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>Navigation One</template>
          <a-menu-item key="/NavigationOne/option4">Option 4</a-menu-item>
          <a-menu-item key="/NavigationOne/option5">Option 5</a-menu-item>
          <a-menu-item key="/NavigationOne/option6">Option 6</a-menu-item>
          <a-menu-item key="/NavigationOne/option7">Option 7</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="NavigationTwo">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>Navigation Two</template>
          <a-menu-item key="/NavigationTwo/option8">Option 8</a-menu-item>
          <a-menu-item key="/NavigationTwo/option9">Option 9</a-menu-item>
          <a-sub-menu key="navigation3" title="navigation3">
            <a-menu-item key="/navigation3/option10">Option 10</a-menu-item>
            <a-menu-item key="/navigation3/option11">Option 11</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        

        </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="crumbsOne">
        <menu-unfold-outlined
          v-if="state.collapsed"
          class="trigger pl10"
          @click="toggleCollapsed()"
        />
        <menu-fold-outlined v-else class="trigger pl10" @click="toggleCollapsed()" />
        <!-- 面包屑 -->
       <!-- <div class="crumbs">
         <a-breadcrumb class="pl10">
           <a-breadcrumb-item>Ant Design Vue</a-breadcrumb-item>
           <a-breadcrumb-item><a href="">Component</a></a-breadcrumb-item>
           <a-breadcrumb-item>
             <a href="">General</a>
             <template #overlay>
               <a-menu>
                 <a-menu-item key="5">Option 4</a-menu-item>
                 <a-menu-item key="6">Option 5</a-menu-item>
                 <a-menu-item key="7">Option 6</a-menu-item>
                 <a-menu-item key="8">Option 7</a-menu-item>
               </a-menu>
             </template>
           </a-breadcrumb-item>
           <a-breadcrumb-item>Button</a-breadcrumb-item>
         </a-breadcrumb>
       </div> -->
       <div class="crumbs">
        <a-breadcrumb :routes="routes" separator=">">
        <template #itemRender="{ route, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.name }}
          </span>
          <!-- <router-link v-else :to="`${route.path}`" >
            {{ route.name}}
          </router-link> -->
          <router-link v-else to=""  @click="handleClick(route, paths, $event)">
            {{ route.name}}
          </router-link>
        </template>
      </a-breadcrumb>
       </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '700px' }"
      >
        <!-- <a-button class="ml" @click="go('login')" type="primary">login</a-button><br>
        <a-button class="ml" @click="go('mockList')" type="primary">mockList</a-button><br>
        <a-button @click="go('table')" type="primary">table</a-button> -->
        <!-- 二级路由出口 -->
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>
<script lang="ts" setup>
  //Layout布局 ---collapsible：是否收起
  import {useRouter , useRoute} from 'vue-router'
  import { ref ,watch,reactive} from 'vue';
  import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
  import {menuList} from './data'



  const router = useRouter()
  const {path} = useRoute()
  // console.log(router,'9090')
  
  watch(
    [path],
    (_val, oldVal) => {
      console.log(path,'谢子卿')
    },
  );
  //全局定义
  interface Route {
    path: string;
    name: string;
    children?: Array<{
      path: string;
      name: string;
      children?:Array<{
        path: string;
        name: string;
      }>;
    }>;
  }

  const routes = ref<Route[]>([
    // {
    //   path: '/',
    //   name: 'Layout'
    // },
    {
      path: '/login',
      name:'Login',
    },
    {
      path: '/table',
      name:'Table',
    },
    {
      path: '/mockList',
      name:'MockList',
    },
    {
      // path: '/NavigationOne',
      path: '/NavigationOne/option4',
      name:'NavigationOne',
      children: [
        {
          path: '/NavigationOne/option4',
          name:'option4',

        },
        {
          path: '/NavigationOne/option5',
          name:'option5',
        },
        {
          path: '/NavigationOne/option6',
          name:'option6',
        },
        {
          path: '/NavigationOne/option7',
          name:'option7'
        },
      ]
    },
    {
      path: '/NavigationTwo',
      name:'NavigationTwo',
      children: [
        {
          path: '/NavigationTwo/option8',
          name:'option8'
        },
        {
          path: '/NavigationTwo/option9',
          name:'option9',
        },
        {
          path: '/navigation3/option10',
          name:'option10',
        },
        {
          path: '/navigation3/option11',
          name:'option11',
        },
          
        
      ]
    }
    ]);
  //缩起内嵌菜单
  const state = ref({
    collapsed: false,
    selectedKeys: ['/login'],//当前选中的菜单项key数组
    openKeys: ['NavigationOne'],//当前展开的subMenu菜单项key数组
    preOpenKeys: ['NavigationOne'],
  });
  // console.log(state.value,'state.value');


  watch(
    () => state.value.openKeys,
    (_val, oldVal) => {
      // console.log(_val,'_val');
      // console.log(oldVal,'oldVal');
      
      
      state.value.preOpenKeys = oldVal;
      // console.log(state.value.preOpenKeys,'preOpenKeys');
      // console.log(state.value.openKeys,'openKeys');
      
      
    },
  );
  const toggleCollapsed = () => {
    state.value.collapsed = !state.value.collapsed;
    state.value.openKeys = state.value.collapsed ? [] : state.value.preOpenKeys;
  };

  //点击事件
  const cliskMenuItem = ({ item, key, keyPath }:any)=>{
    // console.log(state.value.preOpenKeys,'121');
    // console.log(state.value.selectedKeys,'122');
    // console.log(item,'item');
    // console.log(key,'key');
    router.push(`${key}`)

    // console.log(keyPath,'keyPath');
  }
  const handleClick = (route:any, paths: string[], e: Event)=>{
    // console.log(route,'route');
    // console.log(paths,'paths');
    // console.log(e, '$event');
    router.push(route.path)
    
  }
  //按钮点击跳转页面
  const  go = (val:string)=>{
    if(val === 'login'){
      router.push('/login')
    }else if (val === 'mockList') {
      router.push('/mockList')
    }else if (val === 'table'){
      router.push('/table')
    }else{
      return
    }
  }
</script>
<style lang="less">
  @import '@/assets/styles/mixins.css';

  #components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.yangshi{
  padding: 0px 0px 0px 10px;
}

.crumbsOne{
  position: relative;
}
.crumbs{
  position: absolute;
  display: flex;
  top: 20px;
  left: 30px;

}

</style>



