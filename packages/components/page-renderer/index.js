import PageRenderer from './PageRenderer.vue'
import { componentInstall } from '@vue-blocks/utils'

export const PageRendererComponent = componentInstall(PageRenderer)
export { defaultData as pageRendererDefaultData } from './defaultData'
export { builtInBlocks } from './blockMap'

export default PageRendererComponent
