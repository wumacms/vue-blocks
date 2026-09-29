import FeaturesBlock from './FeaturesBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const FeaturesBlockComponent = componentInstall(FeaturesBlock)
export { defaultData as featuresDefaultData } from './defaultData'
export { defaultStyles as featuresDefaultStyles } from './defaultStyles'
export { default as featuresSchema } from './schema.json'

export default FeaturesBlockComponent
