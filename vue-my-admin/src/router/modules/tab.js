 /**
  * table表格组件路由
  * 
  */
 import Layout from '@/layout'
 const tab = {
    path: '/tab',
    component: Layout,
    children: [
      // 表格列表页面index
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'table表单', icon: 'tab' }
      }
    ]
  }
  export default tab