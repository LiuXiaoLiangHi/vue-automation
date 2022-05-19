import defaultSettings from '@/settings'

/**@description:文档的标题 */
const title = defaultSettings.title || 'Vue Element Admin'

/**
 * @description: 得到文章的title
 * @param {String} pageTitle 自定义的文章的title
 * @return {*}
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
