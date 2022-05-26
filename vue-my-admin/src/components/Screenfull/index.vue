<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
// 切换屏幕状态的包来自----https://www.yarnpkg.cn/package/screenfull
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      // 是否全屏
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      // 如果screenfull不被浏览器支持
      if (!screenfull.enabled) {
        this.$message({
          message: "您的浏览器不支持全屏",
          type: "warning",
        });
        return false;
      }
      //切换屏幕状态--全屏--不全屏
      screenfull.toggle();
    },
    // 切换组件中数据--屏幕的状态-- this.isFullscreen
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      // 如果screenfull被浏览器支持
      if (screenfull.enabled) {
        // 添加一个侦听器，用于浏览器切换进入和退出全屏或出现错误时
        screenfull.on("change", this.change);
      }
    },
    // 组件销毁时解除侦听器
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
