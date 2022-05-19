/**
 * 使用clipboard的例子
 * 
 */
import Layout from '@/layout/index.vue'
 const clipboard =  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  }
 export default clipboard