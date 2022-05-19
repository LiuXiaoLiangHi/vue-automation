<template>
  <div
    :class="{ 'setting-button-show': drawer }"
    class="setting-button-default"
    :style="{ top: buttonTop + 'px' }"
    @click="drawer = !drawer"
  >
  
    <i :class="drawer ? 'el-icon-close' : 'el-icon-setting'"/>
  </div>
</template>
<script>
export default {
  name: "SettingButton",
  props: {
    // 按钮的位置
    buttonTop: {
      type: Number,
      default: 250,
    },
  },
  computed: {
    // 得到抽屉是否显示以及控制抽屉的显示
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
// 设置按钮的默认样式
.setting-button-default {
  width: 48px;
  height: 48px;
  background-color: #1890ff;
  position: absolute;
  right: 0px;
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
//当抽屉显示时，按钮触发的样式
.setting-button-show {
  transform: translate(-260px);
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
</style>
