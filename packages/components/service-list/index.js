import ServiceListBlock from './ServiceListBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const ServiceListBlockComponent = componentInstall(ServiceListBlock)
export { defaultData as servicelistDefaultData } from './defaultData'
export { defaultStyles as servicelistDefaultStyles } from './defaultStyles'
export { default as servicelistSchema } from './schema.json'

export default ServiceListBlockComponent
