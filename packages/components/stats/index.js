import StatsBlock from './StatsBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const StatsBlockComponent = componentInstall(StatsBlock)
export { defaultData as statsDefaultData } from './defaultData'
export { defaultStyles as statsDefaultStyles } from './defaultStyles'
export { default as statsSchema } from './schema.json'

export default StatsBlockComponent
