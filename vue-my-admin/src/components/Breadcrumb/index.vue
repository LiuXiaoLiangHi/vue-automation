 <template>
  <el-breadcrumb class="app-breadcrumb" separator="/">

    <transition-group name="breadcrumb">

      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">

        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>

      </el-breadcrumb-item>

    </transition-group>

  </el-breadcrumb>
</template>

<script>
/**
 * 面包屑组件
 */
//将样式路径快速转换为正则表达式实用工具---https://www.yarnpkg.cn/package/path-to-regexp
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    // 监视路由的变化
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      //只显示带有meta.title的路由
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      //匹配到的第一项--（最短的路径，不一定是当前的路径）
      const first = matched[0];
      // 如果第一项不是首页，那么将首页与匹配的项合并
      if (!this.isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(
          matched
        );
      }
      // 再次对匹配的项进行过滤得到最终的面包屑list
      this.levelList = matched.filter(
        // 过滤没有meta,tite,且不需要展示在面包屑的item(breadcrumb==fasle时不展示在面包屑)
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    // 判断是否是首页
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    // 具体有啥用还不清楚
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    // 点击了对应的title后会触发到对应的页面---
    //BUG 重复定向到同一个路由会报错，后期会修复这个Bug
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
