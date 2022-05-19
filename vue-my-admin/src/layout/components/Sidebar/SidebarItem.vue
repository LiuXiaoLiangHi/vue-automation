<template>
  <!--如果item不需要隐藏 -->
  <div v-if="!item.hidden">
    
    <!-- 如果只有一个子路由或者没有子路由的通过这渲染 -->
    <template v-if="xxxx(item.children,item)">

      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)" class="xxx">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 如果有两个及以上的子路由，那么通过这里渲染 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
/**动态渲染sidebar的选项 */
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],

  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      a: 0,
    };
  },
  mounted() {},
  computed: {
    xxxx() {
      return (children, parent) =>
        this.hasOneShowingChild(children, parent) &&
        (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) &&
        !parent.alwaysShow;
    },
  },
  methods: {
    // 只有一个子路由----需要展示在sidebar的路由
    hasOneShowingChild(children = [], parent) {
      /** @type{Array[{},{}]} 需要展示的子路由的集合  */
      const showingChildren = children.filter((item) => {
        // 如果当前页面不需要展示在sidebar
        if (item.hidden) {
          return false;
        } else {
          // 如果只有一个显示子对象，则使用
          this.onlyOneChild = item;
          return true;
        }
      });

      //当只有一个子路由器时，默认显示该子路由器
      if (showingChildren.length === 1) {
        return true;
      }

      //如果没有子路由器显示，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },

    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
