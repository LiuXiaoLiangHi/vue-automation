<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统样式设置</h3>

      <div class="drawer-item">
        <span>主题颜色</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>tabs标签</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定表头</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span> 侧边栏展示logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>
//主题组件
import ThemePicker from '@/components/ThemePicker'

export default {
  components: { ThemePicker },
  data() {
    return {}
  },
  computed: {
    // 得到和设置setting中的fixedHeader
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(newValue) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: newValue
        })
      }
    },
    // 得到和设置setting中的tagsView
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(newValue) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: newValue
        })
      }
    },
    // 得到和设置setting中的sidebarLogo
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  methods: {
    // 改变主体==主题颜色
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
