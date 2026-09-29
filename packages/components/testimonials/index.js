import TestimonialsBlock from './TestimonialsBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const TestimonialsBlockComponent = componentInstall(TestimonialsBlock)
export { defaultData as testimonialsDefaultData } from './defaultData'
export { defaultStyles as testimonialsDefaultStyles } from './defaultStyles'
export { default as testimonialsSchema } from './schema.json'

export default TestimonialsBlockComponent
