<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
</template>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { IEditorConfig } from '@wangeditor/editor'
  import { IToolbarConfig } from '@wangeditor/editor'
  import { DomEditor } from '@wangeditor/editor'
  import {message }  from  'ant-design-vue'
  import { IDomEditor } from '@wangeditor/editor'
  //图片元素类型
  import { SlateElement } from '@wangeditor/editor'
  
  type InsertFnType = (url: string, alt: string, href: string) => void
  type ImageElement = SlateElement & {
      src: string
      alt: string
      url: string
      href: string
  }
  const mode = 'default'// const mode = 'simple' //可隐藏选中文本时的 hoverbar 
  const editorRef = shallowRef()// 编辑器实例，必须用 shallowRef，重要！
  // 内容 HTML
  const valueHtml = ref()
  // 返回值有三种选择：
  // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
  // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
  // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息

  // 自定义校验链接
  const  customCheckLinkFn = (text: string, url: string): string | boolean | undefined => { 
      if (!url) {
        return 
      }
      if (url.indexOf('http') !== 0) {
          return '链接必须以 http/https 开头' //效果和antd error 提示一致
      }
      return true
  }
  // 自定义转换链接 url
  const customParseLinkUrl= (url: string): string => { 
      if (url.indexOf('http') !== 0) {
          return `http://${url}`
      }
      return url
  }
  // 自定义校验图片
  const customCheckImageFn =(src: string, alt: string, url: string): boolean | undefined | string =>{  
    //图片地址                                        
      if (!src)return
      if (src.indexOf('http') !== 0) return '图片地址必须以 http/https 开头'
      //图片链接 --可以不填 但是填了就会校验链接开头是否携带http
      if (!url) { 
        customAlert('可填写图片链接便于跳转查看','warning') 
        // return '图片链接必须以 http/https 开头'
        return true
      }else{
        if (url.indexOf('http') !== 0) return '图片链接必须以 http/https 开头'
      }
      return true
  }

  // 转换图片链接
  const  customParseImageSrc = (src: string): string => {  
      if (src.indexOf('http') !== 0) {
          return `http://${src}`
      }
      return src
  }
  const toolbarConfig: Partial<IToolbarConfig> = {  
    //重新配置工具栏
    // toolbarKeys:[
    //   {
    //     iconSvg:'<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
    //     key:'group-image',
    //     menuKeys:["insertImage"],
    //     title:'图片'
    //   }
    // ],
    excludeKeys:[ //仅排除某些菜单，其他保留，可以使用excludeKeys
      'group-more-style',//菜单组 -删除线-上标-下标-行内代码 ---//写菜单组的key值
      'emotion',
      'group-video',
      'blockquote',//引用
      // 'group-image',
    ]
  }
  // 初始化 MENU_CONF 属性
  const editorConfig: Partial<IEditorConfig> = {                   
    MENU_CONF: {},
    placeholder: '请输入内容...'
    // 其他属性...
  }
  // 插入链接
  //@ts-ignore
  editorConfig.MENU_CONF['insertLink'] = {
    checkLink: customCheckLinkFn, 
    parseLinkUrl: customParseLinkUrl, 
  }
  // 更新链接
  //@ts-ignore
  editorConfig.MENU_CONF['editLink'] = {
    checkLink: customCheckLinkFn, 
    parseLinkUrl: customParseLinkUrl, 
  } 
  // 插入图片
  //@ts-ignore
  editorConfig.MENU_CONF['insertImage'] = {
    //onInsertedImage 插入图片之后的回调
    onInsertedImage(imageNode: ImageElement | null) {  
        if (imageNode == null) return false
        const { src, alt, url, href } = imageNode
        // console.log('inserted image', src, alt, url, href)
    },
    checkImage: customCheckImageFn, 
    parseImageSrc: customParseImageSrc, 
  }
  // 编辑图片
  //@ts-ignore
  editorConfig.MENU_CONF['editImage'] = {
    //onUpdatedImage 更新图片之后的回调
    onUpdatedImage(imageNode: ImageElement | null) {  
        if (imageNode == null) return
        const { src, alt, url } = imageNode
        // console.log('updated image', src, alt, url)
    },
    checkImage: customCheckImageFn,  //校验图片链接
    parseImageSrc: customParseImageSrc,  //转换图片链接
  }
  // 修改 uploadImage 菜单配置
  //@ts-ignore
  editorConfig.MENU_CONF['uploadImage'] = {
    server: '', //服务端地址
    fieldName: 'custom-field-name',
    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 10 * 1024 * 1024, // 10M
    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {
        token: 'xxx',
        otherKey: 'yyy'
    },

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
    },

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒

    //回调
     // 上传之前触发
    onBeforeUpload(file: File) { 
      // file 选中的文件，格式如 { key: file }
      return file
      // 可以 return
      // 1. return file 或者 new 一个 file ，接下来将上传
      // 2. return false ，不上传这个 file
    },

    // 上传进度的回调函数
    onProgress(progress: number) {  
        // progress 是 0-100 的数字
        // console.log('progress', progress)
    },

    // 单个文件上传成功之后
    onSuccess(file: File, res: any) {  
        // console.log(`${file.name} 上传成功`, res)
    },

    // 单个文件上传失败
    onFailed(file: File, res: any) {   
        // console.log(`${file.name} 上传失败`, res)
    },

    // 上传错误，或者触发 timeout 超时
    onError(file: File, err: any, res: any) {  
        // console.log(`${file.name} 上传出错`, err, res)
    },
        // 自定义插入图片
    customInsert(res: any, insertFn: InsertFnType) {  
        // console.log(res,'00000');
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插入图片
        // insertFn(url, alt, href)
    },
       // 自定义上传
    customUpload(file: File, insertFn: InsertFnType) { 
      console.log(file);
      
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        // insertFn(url, alt, href)
        // insertFn('https://images.ctfassets.net/hrltx12pl8hq/12hKiaQ8Mr1mBF25k36riY/ef955fe22ea317f0de8719f19a2fad2c/Hero_Oct_05.jpg?fit=fill&w=2560&h=400&fm=webp','shen','https://www.antdv.com/components/upload-cn')
    }
  }

  // 编辑器创建完毕时的回调函数
  const handleCreated = (editor:IDomEditor) => {
    // console.log('created', editor);
    editorRef.value = editor // 记录 editor 实例，重要！
    // console.log(editor.getAllMenuKeys());
  }
  //编辑器内容、选区变化时的回调函数
  const handleChange = (editor:IDomEditor) => {
    console.log('change:', editor.getHtml());
    const toolbar = DomEditor.getToolbar(editor)
    const curToolbarConfig = toolbar?.getConfig() //查看工具链的默认配置
    // console.log( curToolbarConfig?.toolbarKeys ,'90909') // 当前菜单排序和分组

    //------
    // console.log(editor.children); //查看插入元素类型
    // console.log(editor.getAllMenuKeys()); //查看选中后悬浮编辑的类型
  }
  //编辑器销毁时的回调函数
  const handleDestroyed = (editor:IDomEditor) => {  
    // console.log('destroyed', editor)
  }
  //编辑器聚焦时的回调函数
  const handleFocus = (editor:IDomEditor) => {
      // console.log('focus', editor)
  }
  //编辑器失焦时的回调函数
  const handleBlur = (editor:IDomEditor) => {
      // console.log('blur', editor)
  }
  //自定义提示  如果想用 antd 的message功能
  const customAlert = (info:string, type:string) => {
    // alert(`【自定义提示】${type} - ${info}`) ----默认提示
    //提示 --例子
    // customAlert('关于啥','info') 
      switch (type) {
      case 'success':
          message.success(info)
          break
      case 'info':
          message.info(info)
          break
      case 'warning':
          message.warning(info)
          break
      case 'error':
          message.error(info)
          break
      default:
          message.info(info)
          break
  }
  }
  //自定义粘帖，可阻止编辑器的默认粘帖，实现自己的粘帖逻辑
  const customPaste = (editor:any, event:any, callback:any) => {
    // console.log('ClipboardEvent 粘贴事件对象', event)
    // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
    const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    // console.log(html);    
    const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    // console.log(text);
    
    const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）
    // console.log(rtf);
      // 自定义插入内容---同步
      // editor.insertText('dsd')
      // 异步
      // setTimeout(() => {
      //     editor.insertText('yy')
      // }, 1000)
      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false) // 返回 false ，阻止默认粘贴行为
      callback(true) // 返回 true ，继续默认的粘贴行为
  }

// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = ' <p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1tUTg_x12HmTERsnM5C524XU7MjsJEoFwWqCNm1i64g&s" alt="高清图片" data-href="https://www.vcg.com/creative/812597784" style=""/>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })
// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    const editor = editorRef.value //获取 editor ，必须等待它渲染完之后
    if (editor == null) return
    editor.destroy()
})
</script>