import FooterBlock from './FooterBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const FooterBlockComponent = componentInstall(FooterBlock)
export { defaultData as footerDefaultData } from './defaultData'
export { defaultStyles as footerDefaultStyles } from './defaultStyles'
export { default as footerSchema } from './schema.json'

export default FooterBlockComponent
