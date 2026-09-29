/// <reference types="vitepress/client" />

declare module 'vue-blocks' {
  import type { Plugin } from 'vue'
  const VueBlocks: Plugin
  export default VueBlocks
  export * from '@vue-blocks/components'
  export * from '@vue-blocks/utils'
}

declare module '@vue-blocks/components' {
  const components: any
  export default components
  export const NavbarBlock: any
  export const HeroBlock: any
  export const LeftImageRightTextBlock: any
  export const RightImageLeftTextBlock: any
  export const TopTextBottomImageBlock: any
  export const FeaturesBlock: any
  export const TeamBlock: any
  export const StatsBlock: any
  export const IconWallBlock: any
  export const ComparisonTableBlock: any
  export const PricingBlock: any
  export const NewsListBlock: any
  export const NewsDetailBlock: any
  export const ProductListBlock: any
  export const ServiceListBlock: any
  export const CourseListBlock: any
  export const TestimonialsBlock: any
  export const PartnersBlock: any
  export const FaqBlock: any
  export const CtaBlock: any
  export const ContactFormBlock: any
  export const FooterBlock: any
}

declare module '@vue-blocks/utils' {
  export const mergeData: <T>(defaultData: T, customData?: Partial<T>) => T
  export const mergeStyles: <T>(defaultStyles: T, customStyles?: Partial<T>) => T
  export const componentInstall: <T>(comp: T) => T
}
