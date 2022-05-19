export default {
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    //为了修复点击菜单在ios设备将触发mouseleave bug
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
