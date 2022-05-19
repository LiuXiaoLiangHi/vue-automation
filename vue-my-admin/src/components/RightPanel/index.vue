<template>

  <div ref="rightPanel" :class="{show:show}" class="rightPanel-container">
    <!-- 遮罩层 -->
    <div class="rightPanel-background" />
    <!-- 抽屉 -->
    <div class="rightPanel">
      <!-- 按钮 -->
      <div class="handle-button" :style="{'top':buttonTop+'px','background-color':theme}" @click="show=!show">
        <i :class="show?'el-icon-close':'el-icon-setting'" />
      </div>
      <!-- 抽屉里具体的内容 -->
      <div class="rightPanel-items">
        <slot />
      </div>

    </div>
  </div>
</template>

<script>
import { addClass, removeClass } from '@/utils'

export default {
  name: 'RightPanel',
  props: {
    // 点击不关闭
    clickNotClose: {
      default: false,
      type: Boolean
    },
    // 按钮距离top的值
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    // 得到主题
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    // 监视 drawer是否被打开
    show(value) {
      // 打开了且需要点击了关闭
      if (value && !this.clickNotClose) {
        this.addEventClick()
      }
      if (value) {
        // 打开--给 body 添加类名
        addClass(document.body, 'showRightPanel')
      } else {
        // 关闭--给 body 移除类名
        removeClass(document.body, 'showRightPanel')
      }
    }
  },
  mounted() {
    this.insertToBody()
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel
    elx.remove()
  },
  methods: {
    // 给window添加点击事件
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    // 关闭 drawer ----右边的sidebar
    closeSidebar(evt) {
     // 找到离被点击元素最近的祖先元素--.rightPanel
      const parent = evt.target.closest('.rightPanel')
    // 如果不存在---点击了window窗口
      if (!parent) {
        // 关闭 drawer,并移除window上的点击事件closeSidebar
        this.show = false
        window.removeEventListener('click', this.closeSidebar)
      }
    },
    //把当前组件移到body的第一个
    insertToBody() {
      const elx = this.$refs.rightPanel
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    }
  }
}
</script>

<style lang="scss">
//抽屉出现时给body加的样式
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 115px);
}
</style>

<style lang="scss" scoped>
// 遮罩层
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1000;
}
// 抽屉的样式
.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}
//当抽屉显示时
.show {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
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
