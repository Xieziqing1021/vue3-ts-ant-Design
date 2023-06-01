import Layout from '@/views/layout/index.vue'
export const menuList: Record<string, any>[] = [
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
  ]
// export default menuList
