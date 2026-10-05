import SiteRenderer from './SiteRenderer.vue'
import { componentInstall } from '@vue-blocks/utils'

export const SiteRendererComponent = componentInstall(SiteRenderer)
export { defaultData as siteRendererDefaultData } from './defaultData'

export default SiteRendererComponent
