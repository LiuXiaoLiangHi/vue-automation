import Layout from '@/layout/index.vue'
const draggable = {
  path: '/draggable',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/draggable/index'),
      name: 'Draggable',
      meta: {  roles: ['admin'],title: '拖拽效果', icon: 'icon', noCache: true , }
    }
    
  ]
}
export default draggable