<template>
  <div :class="classObj" class="app-wrapper" >
    <!-- 如果是移动端页面，点击空白区域可关闭sidebar-->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container"> </sidebar>
    <!-- 右边主体结构  hasTagsView没有具体效果，只有语义化的功能，提示有tabs-->
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <!-- 头部 -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <!-- 内容区域 -->
      <app-main />
      <!-- 小按钮 如果你的right-panel用的是index2的化，改行请加上，否者请注释-->
      <!-- <setting-button /> -->

      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

//HACK 如果你想用自定义开发的抽屉请选择这个组件--index
import RightPanel from "@/components/RightPanel/index.vue"; 
// TAG如果你选着elment-ui的抽屉请启用--index2
// import RightPanel from "@/components/RightPanel/index2.vue";

import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";

import ResizeMixin from "./mixin/ResizeHandler";

// TAG当你使用RightPanel组件的index2时请启用
// import SettingButton from "./setting-button.vue";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    // SettingButton,//TAG  当你使用RightPanel组件的index2时请启用
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar, // 侧边栏的设置
      device: (state) => state.app.device, // 当前设备
      showSettings: (state) => state.settings.showSettings, //是否展示右边的按钮
      needTagsView: (state) => state.settings.tagsView, // 需要tabs
      fixedHeader: (state) => state.settings.fixedHeader, //是否固定表头
    }),
    // 加上相应的className
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened, // 类名 hideSiderbar---当didebar隐藏时显示
        openSidebar: this.sidebar.opened, // 类名 hideSiderbar---当didebar打开时显示
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile", //类名 mobile ---当屏幕尺寸为手机时显示该类名
      };
    },
  },
  methods: {
    //关闭sidebr
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>

@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";


.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  // 当屏幕尺寸为手机且打开了sidebar时&的样式
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  //屏幕尺寸为手机时且sidebar打开时的---遮罩层
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999; //一定要小于sidebar的index,不然点击sidebar也会关闭
  }
  // 当header被固定时的样式
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth}); //sideBarWidth为sidebar
    transition: width 0.28s;
  }

  // 当屏幕尺寸为手机时--固定header的样式
  .mobile .fixed-header {
    width: 100%;
  }
  // 当隐藏sidebar时--固定header的样式
  .hideSidebar .fixed-header {
    // width: calc(100% - 54px);
  }
}
</style>
