import HeroBlock from './HeroBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const HeroBlockComponent = componentInstall(HeroBlock)
export { defaultData as heroDefaultData } from './defaultData'
export { defaultStyles as heroDefaultStyles } from './defaultStyles'
export { default as heroSchema } from './schema.json'

export default HeroBlockComponent
