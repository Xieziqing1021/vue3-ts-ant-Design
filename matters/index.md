


1. 创建项目 yarn create vite vue3-ts-ziqing --template vue-ts 
2. 安装依赖 yarn
3. 启动项目 yarn dev
4. 删除刚建立的项目里不要的数据，
5. 新建一些工具文件
    - `utils` 用于存放工具相关
    - `assets/images` 用于存放图片相关
    - `assets/styles` 用于存放样式相关
    - `router` 用于存放路由相关
    - `store`用于存放数据相关
    - `views`用于存放页面级别的组件
    - `types`用于存放 ts 的公共类型
6. 使用gitHub管理项目
    - 初始化项目：`git init`
    - 将代码添加到暂存区： `git add .`
    - 提交代码 `git commit -m '初始化提交'`
    - 和在码云上操作一样，唯一不同的是gitHub不在接受账号密码验证账户，需要唯一的token来验证，注意一下
7. 安装 axios  yarn add axios,在src/utils文件下新建request来配置请求拦截和响应拦截
8. 配置 @ 路径别名，方便导入模块，在vite.config.ts中配置 
        export default defineConfig({
            plugins: [vue()],
            resolve: {
                alias: {
                '@': path.resolve(__dirname, './src')
                }
            }
        })
    安装node类型声明文件 yarn add @types/node -D
    在tsconfig.json文件下增加配置
        {
            "compilerOptions": {
                "baseUrl": ".",
                "paths": {
                    "@/*": ["src/*"]
                }
            }
        }
    注意：更改了vite.config.ts项目，记得重启
9. 能够使用功能 normalize.css 重置项目中的样式，安装 yarn add normalize.css 
   在mian.ts 中导入即可 import 'normalize.css'
10. 配置路由 安装 yarn add vue-router
11. 使用 pinia 管理数据，安装 yarn add pinia

