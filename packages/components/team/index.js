import TeamBlock from './TeamBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const TeamBlockComponent = componentInstall(TeamBlock)
export { defaultData as teamDefaultData } from './defaultData'
export { defaultStyles as teamDefaultStyles } from './defaultStyles'
export { default as teamSchema } from './schema.json'

export default TeamBlockComponent
