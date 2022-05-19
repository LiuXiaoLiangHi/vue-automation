<template>
  <div ref="rightPanel" :class="{ show: drawer }" class="rightPanel-container">
    <el-drawer size="260px" :visible.sync="drawer" :with-header="false">
      <slot />
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   show: false,
    };
  },
  computed: {
    // 得到主题
    theme() {
      return this.$store.state.settings.theme;
    },
    drawer: {
      get() {
        return this.$store.state.settings.is_show_drawer;
      },
      set(newValue) {
        this.$store.dispatch("settings/changeSetting", {
          key: "is_show_drawer",
          value: newValue,
        });
      },
    },
  },
};
</script>
<style lang="scss" scoped>
// 遮罩层
// .rightPanel-background {
//   position: fixed;
//   top: 0;
//   left: 0;
//   opacity: 0;
//   transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
//   background: rgba(0, 0, 0, 0.2);
//   z-index: -1000;
// }
// 抽屉的样式
.rightPanel {
  //   width: 100%;
  //   max-width: 260px;
  //   height: 100vh;
  position: relative;
  //   top: 0;
  //   right: 0;
  //   box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  //   transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  //   transform: translate(100%);
  //   background: #fff;
  //   z-index: 40000;
}
//当抽屉显示时
.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    // z-index: 20000;
    // opacity: 1;
    // width: 100%;
    // height: 100%;
  }

  .rightPanel {
    // transform: translate(0);
  }
  .handle-button {
    // right: 240px;
    // z-index: 2036;
    //  animation: rtl-drawer-in 0.4s 1ms;

    transform: translate(-260px);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
