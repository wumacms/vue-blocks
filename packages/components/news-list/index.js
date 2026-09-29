import NewsListBlock from './NewsListBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const NewsListBlockComponent = componentInstall(NewsListBlock)
export { defaultData as newslistDefaultData } from './defaultData'
export { defaultStyles as newslistDefaultStyles } from './defaultStyles'
export { default as newslistSchema } from './schema.json'

export default NewsListBlockComponent
