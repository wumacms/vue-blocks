import NavbarBlock from './NavbarBlock.vue'
import { componentInstall } from '@vue-blocks/utils'

export const NavbarBlockComponent = componentInstall(NavbarBlock)
export { defaultData as navbarDefaultData } from './defaultData'
export { defaultStyles as navbarDefaultStyles } from './defaultStyles'
export { default as navbarSchema } from './schema.json'

export default NavbarBlockComponent
