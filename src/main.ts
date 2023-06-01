import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 引入通用样式，浏览器表现是一致的
import 'normalize.css'
import router from './router'
import {createPinia} from 'pinia'


 
 



const app = createApp(App); 
app.use(Antd)
app.use(router)
app.use(createPinia())
app.mount('#app');





