import NewsDetailBlock from './NewsDetailBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const NewsDetailBlockComponent = componentInstall(NewsDetailBlock)
export { defaultData as newsdetailDefaultData } from './defaultData'
export { defaultStyles as newsdetailDefaultStyles } from './defaultStyles'
export { default as newsdetailSchema } from './schema.json'

export default NewsDetailBlockComponent
