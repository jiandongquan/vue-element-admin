/**
 * @description 系统默认全局配置参数项,用于配置系统界面上的全局设置信息
 */
module.exports = {
  title: 'Antz管理系统',

  /**
   * @type {boolean} true | false
   * @description 是否显示右侧设置面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定Header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在sidebar中显示Logo
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
