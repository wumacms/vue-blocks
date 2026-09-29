import PartnersBlock from './PartnersBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const PartnersBlockComponent = componentInstall(PartnersBlock)
export { defaultData as partnersDefaultData } from './defaultData'
export { defaultStyles as partnersDefaultStyles } from './defaultStyles'
export { default as partnersSchema } from './schema.json'

export default PartnersBlockComponent
