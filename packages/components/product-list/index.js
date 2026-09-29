import ProductListBlock from './ProductListBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const ProductListBlockComponent = componentInstall(ProductListBlock)
export { defaultData as productlistDefaultData } from './defaultData'
export { defaultStyles as productlistDefaultStyles } from './defaultStyles'
export { default as productlistSchema } from './schema.json'

export default ProductListBlockComponent
