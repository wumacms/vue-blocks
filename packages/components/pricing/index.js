import PricingBlock from './PricingBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const PricingBlockComponent = componentInstall(PricingBlock)
export { defaultData as pricingDefaultData } from './defaultData'
export { defaultStyles as pricingDefaultStyles } from './defaultStyles'
export { default as pricingSchema } from './schema.json'

export default PricingBlockComponent
