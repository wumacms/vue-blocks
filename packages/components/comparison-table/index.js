import ComparisonTableBlock from './ComparisonTableBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const ComparisonTableBlockComponent = componentInstall(ComparisonTableBlock)
export { defaultData as comparisontableDefaultData } from './defaultData'
export { defaultStyles as comparisontableDefaultStyles } from './defaultStyles'
export { default as comparisontableSchema } from './schema.json'

export default ComparisonTableBlockComponent
