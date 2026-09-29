import ContactFormBlock from './ContactFormBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const ContactFormBlockComponent = componentInstall(ContactFormBlock)
export { defaultData as contactformDefaultData } from './defaultData'
export { defaultStyles as contactformDefaultStyles } from './defaultStyles'
export { default as contactformSchema } from './schema.json'

export default ContactFormBlockComponent
