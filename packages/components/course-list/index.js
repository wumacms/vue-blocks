import CourseListBlock from './CourseListBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const CourseListBlockComponent = componentInstall(CourseListBlock)
export { defaultData as courselistDefaultData } from './defaultData'
export { defaultStyles as courselistDefaultStyles } from './defaultStyles'
export { default as courselistSchema } from './schema.json'

export default CourseListBlockComponent
