<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="login_main_tabs">
    <el-tab-pane name="noPassword">
      <div slot="label" style="display:flex;padding-left:16px">
       <span >免密码登录</span>
        <svg-icon icon-class="三角形" class="login_main_tabs_svg" v-show="svg_show" />
      </div>
      <NoPassword />
    </el-tab-pane>
    <el-tab-pane name="hasPassword">
      <div slot="label">密码登录
        <svg-icon icon-class="三角形" class="login_main_tabs_svg" v-show="!svg_show" />
      </div>
      <PasswordToLogin />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import NoPassword from "../content/Nopassword.vue";
import PasswordToLogin from "../content/PasswordToLogin.vue";
// import QuickMark from "../../components/QuickMark.vue"
export default {
  components: {
    NoPassword,
    PasswordToLogin,
    // QuickMark
  },
  data() {
    return {
      activeName: "noPassword", // 当前选中的tabs的name
      svg_show: true, //控制tabs对应的svg是否显示
      lastActiveName: "noPassword",
    };
  },
  methods: {
    //点击每一个tas都会触发
    handleClick(tab) {
      console.log(tab.name);
      if (this.lastActiveName == tab.name) {
        console.log("重复点击了同一个Tab");
      } else {
        this.lastActiveName = tab.name;
        this.isSvgShow(); // 切换svg的状态
      }
    },
    //0.3秒后切换svg是否显示
    isSvgShow() {
      setTimeout(() => {
        this.svg_show = !this.svg_show;
      }, 300);
    },
  },
};
</script>
<style lang="scss" scoped>
 
.login_main_tabs_svg {
  width: 10px !important;
  height: 10px !important;
  position: absolute;
  bottom: 0;
  left: 50%;
  
}

</style>
<style lang="scss">
.login_main_tabs {
  .el-tabs__header {
    height: 60px;
    line-height: 60px;
    margin: 0 !important;
    margin-bottom: 24px !important;

    .el-tabs__item {
      text-align: center;
      width: 100px;
      height: 60px !important;
      line-height: 60px !important;
      padding: 0 !important;
    }

    .el-tabs__item.is-active {
      color: #131111 !important;
      font-weight: 800;
    }

    .el-tabs__nav-wrap::after {
      height: 1px !important;
    }

    .el-tabs__active-bar {
      background-color: #a0cfff;
    }
  }
}
</style>
