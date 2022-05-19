<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label
           }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
/**这是在nav栏的设置字体大小的组件 */
export default {
  data() {
    return {
      sizeOptions: [
        { label: "Default", value: "default" },
        { label: "Medium", value: "medium" },
        { label: "Small", value: "small" },
        { label: "Mini", value: "mini" },
      ],
    };
  },
  computed: {
    size() {
      return this.$store.getters.size;
    },
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size;
      this.$store.dispatch("app/setSize", size);
      this.refreshView();
      this.$message({
        message: "Switch Size Success",
        type: "success",
      });
    },
    //为了使缓存的页面重新呈现
    refreshView() {
      this.$store.dispatch("tagsView/delAllCachedViews", this.$route);

      const { fullPath } = this.$route;
      console.log(fullPath);
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        });
      });
    },
  },
};
</script>
