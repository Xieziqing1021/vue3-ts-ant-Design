import { createRouter, createWebHashHistory } from 'vue-router'
import {routes} from '../components/routerText'
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
export default router
// routes: [
//   {
//     path: '/',
//     component: Layout,
//     //路由重定向-到login页面
//     // redirect: '/login',
//     children:[
//       {
//         path: '/login',
//         name:'Login',
//         component: () => import('@/views/login/index.vue')
//       },
//       {
//         path: '/table',
//         name:'Table',
//         component: () => import('@/views/table/index.vue')
//       },
//       {
//         path: '/mockList',
//         name:'MockList',
//         component: () => import('@/views/mockList/index.vue')
//       },
//       {
//         path: '/NavigationOne',
//         name:'NavigationOne',
//         component: () => import('@/views/NavigationOne/index.vue'),
//         // redirect: '/NavigationOne/option4',
//         children: [
//           {
//             path: '/NavigationOne/option4',
//             component: () => import('@/views/NavigationOne/Option4/index.vue')
//           },
//           {
//             path: '/NavigationOne/option5',
//             component: () => import('@/views/NavigationOne/Option5/index.vue')
//           },
//           {
//             path: '/NavigationOne/option6',
//             component: () => import('@/views/NavigationOne/Option6/index.vue')
//           },
//           {
//             path: '/NavigationOne/option7',
//             component: () => import('@/views/NavigationOne/Option7/index.vue')
//           },
//         ]
//       },
//       {
//         path: '/NavigationTwo',
//         name:'NavigationTwo',
//         component: () => import('@/views/NavigationTwo/index.vue'),
//         children: [
//           {
//             path: '/NavigationTwo/option8',
//             component: () => import('@/views/NavigationTwo/Option8/index.vue')
//           },
//           {
//             path: '/NavigationTwo/option9',
//             component: () => import('@/views/NavigationTwo/Option9/index.vue')
//           },
//           {
//             path: '/navigation3',
//             component: () => import('@/views/NavigationTwo/navigation3/index.vue'),
//             children: [
//               {
//                 path: '/navigation3/option10',
//                 component: () => import('@/views/NavigationTwo/navigation3/Option10/index.vue')
//               },
//               {
//                 path: '/navigation3/option11',
//                 component: () => import('@/views/NavigationTwo/navigation3/Option11/index.vue')
//               },
//             ]

//           },

//         ]
//       }
//     ]
//   },


