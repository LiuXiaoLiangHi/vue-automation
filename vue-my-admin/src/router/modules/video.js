  /**
  * video表格组件路由
  * 
  */
   import Layout from '@/layout'
   const video = {
      path: '/video',
      component: Layout,
      children: [
        // 表格列表页面index
        {
          path: 'index',
          component: () => import('@/views/video/index'),
          name: 'Video',
          meta: { title: '测试video', icon: 'el-icon-video-camera' }
        }
      ]
    }
    export default video