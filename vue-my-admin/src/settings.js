module.exports = {
  title: '我的项目名称', // 项目的title

  /**
   * @type {boolean} true | false
   * @description  是否显示设置的右面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description  是否需要 tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description  是否固定头部信息
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   *  是否展示login在侧边栏
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description  需要显示err日志组件。
     *默认只在生产环境中使用
     如果你想在dev中使用它，你可以传递['production'， 'development']
   */
  errorLog: 'production'
}
