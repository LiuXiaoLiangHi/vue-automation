/**
 *  icon组件路由
 * 
 */

import Layout from '@/layout/index.vue'
const icon = {
  path: '/icon',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: { title: 'Icons', icon: 'icon', noCache: true }
    }
  ]
}
export default icon