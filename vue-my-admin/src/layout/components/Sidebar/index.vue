<template>
  <div :class="{'has-logo':showLogo}">
    
    <logo v-if="showLogo" :collapse="isCollapse" />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
/**sidebar的主体结构组件 */
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),

    activeMenu() {
      // rouet :当前路由信息全部信息
      const route = this.$route
      // mete ：当前路由元信息
      // path : 当前路由的相对完整路径
      const { meta, path } = route
     //如果设置了路径，侧边栏将突出显示你设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 切换logo显示
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    //
    variables() {
      return variables
    },
    // 是否折叠
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
