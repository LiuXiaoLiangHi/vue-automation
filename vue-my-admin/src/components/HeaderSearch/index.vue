<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <!-- 
      filterable:<Boolean>:启用搜索功能
      remote-method:<Function>:使用其他的搜索逻辑
      default-first-option:<Boolean>:在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用
      remote:是否为远程搜索
     -->
    <el-select
      ref="headerSearchSelect"
      class="header-search-select"
      placeholder="搜索"
      v-model="search"
      @change="change"
      filterable
      :remote-method="querySearch"
      default-first-option
      remote
    >
      <el-option
        v-for="item in options"
        :key="item.item.path"
        :value="item"
        :label="item.item.title.join(' > ')"
       
      />
      <!-- <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" /> -->
    </el-select>
  </div>
</template>

<script>
/**这是nav栏的搜索模块 */
// fuse.is是轻量级的模糊搜索模块让搜索结果更符合预期
import Fuse from "fuse.js";
import path from "path";

export default {
  name: "HeaderSearch",
  data() {
    return {
      //
      search: "",
      // 搜索匹配的项
      options: [],
      searchPool: [],
      // 搜索框是否展开
      show: false,
      // fuse对象
      fuse: undefined,
    };
  },
  computed: {
    // 所有用户共有的路由
    routes() {
      return this.$store.getters.permission_routes;
    },
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    searchPool(list) {
      //初始化模糊搜索
      this.initFuse(list);
    },
    //监视搜索框显示和隐藏触发的函数
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    },
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    /**
     * @description:打开搜索框
     */
    click() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
      }
    },

    /**
     * @description:关闭搜索框-恢复到初始化的状态
     */
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
      this.options = [];
      this.show = false;
    },
    /**
     * @description:当用户点击了option中的某一项触发
     * @param {*} val 被选中的option选项对象
     */
    change(val) {
      // 路由跳转并初始化搜索框的数据
      this.$router.push(val.item.path);
      this.search = "";
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
    },
    /**
     * @description: 初始化fuse对象
     * @param {*} list 在sideabr的所有路由
     */    
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7,
          },
          {
            name: "path",
            weight: 0.3,
          },
        ],
      });
    },
    //过滤掉可以显示在侧边栏的路由
    // And generate the internationalized title
    //生成国际化的标题
    /**
     * @description: 
     * @param {*} routes
     * @param {*} basePath
     * @param {*} prefixTitle
     * @return {*}
     */    
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle],
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];

          if (router.redirect !== "noRedirect") {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title);
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },

    /**
     * @description: 搜索的入口函数
     * @param {String} query 搜索的内容
     * @return {*}
     */    
    querySearch(query) {
      if (query !== "") {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
