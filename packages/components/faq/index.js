import FaqBlock from './FaqBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const FaqBlockComponent = componentInstall(FaqBlock)
export { defaultData as faqDefaultData } from './defaultData'
export { defaultStyles as faqDefaultStyles } from './defaultStyles'
export { default as faqSchema } from './schema.json'

export default FaqBlockComponent
