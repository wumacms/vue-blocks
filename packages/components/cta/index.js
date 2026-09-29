import CtaBlock from './CtaBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const CtaBlockComponent = componentInstall(CtaBlock)
export { defaultData as ctaDefaultData } from './defaultData'
export { defaultStyles as ctaDefaultStyles } from './defaultStyles'
export { default as ctaSchema } from './schema.json'

export default CtaBlockComponent
