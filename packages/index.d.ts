import type { App, Plugin, DefineComponent } from 'vue'

export type BlockComponent = DefineComponent<
  {
    variant?: string | number
    data?: Record<string, any>
    styles?: Record<string, any>
  },
  {},
  any
>

// 22 组标准区块组件导出
export const NavbarBlock: BlockComponent
export const HeroBlock: BlockComponent
export const PartnersBlock: BlockComponent
export const FeaturesBlock: BlockComponent
export const TopTextBottomImageBlock: BlockComponent
export const StatsBlock: BlockComponent
export const LeftImageRightTextBlock: BlockComponent
export const RightImageLeftTextBlock: BlockComponent
export const IconWallBlock: BlockComponent
export const ServiceListBlock: BlockComponent
export const ProductListBlock: BlockComponent
export const CourseListBlock: BlockComponent
export const TestimonialsBlock: BlockComponent
export const TeamBlock: BlockComponent
export const PricingBlock: BlockComponent
export const ComparisonTableBlock: BlockComponent
export const NewsListBlock: BlockComponent
export const NewsDetailBlock: BlockComponent
export const FaqBlock: BlockComponent
export const CtaBlock: BlockComponent
export const ContactFormBlock: BlockComponent
export const FooterBlock: BlockComponent

// 别名导出（兼容 Component 命名）
export const NavbarBlockComponent: BlockComponent
export const HeroBlockComponent: BlockComponent
export const PartnersBlockComponent: BlockComponent
export const FeaturesBlockComponent: BlockComponent
export const TopTextBottomImageBlockComponent: BlockComponent
export const StatsBlockComponent: BlockComponent
export const LeftImageRightTextBlockComponent: BlockComponent
export const RightImageLeftTextBlockComponent: BlockComponent
export const IconWallBlockComponent: BlockComponent
export const ServiceListBlockComponent: BlockComponent
export const ProductListBlockComponent: BlockComponent
export const CourseListBlockComponent: BlockComponent
export const TestimonialsBlockComponent: BlockComponent
export const TeamBlockComponent: BlockComponent
export const PricingBlockComponent: BlockComponent
export const ComparisonTableBlockComponent: BlockComponent
export const NewsListBlockComponent: BlockComponent
export const NewsDetailBlockComponent: BlockComponent
export const FaqBlockComponent: BlockComponent
export const CtaBlockComponent: BlockComponent
export const ContactFormBlockComponent: BlockComponent
export const FooterBlockComponent: BlockComponent

// 页面渲染器类型声明
export interface BlockItem {
  type: string
  id?: string
  variant?: string | number
  data?: Record<string, any>
  styles?: Record<string, any>
}

export interface PageSEO {
  title?: string
  description?: string
  keywords?: string | string[]
  meta?: Array<{ name?: string; property?: string; content: string }> | Record<string, string>
}

export interface PageData {
  seo?: PageSEO
  title?: string
  description?: string
  keywords?: string | string[]
  navbar?: any
  containerClass?: string
  mainClass?: string
  blocks: BlockItem[]
  footer?: any
}

export interface SubmitContext {
  block: BlockItem | any
  index: number | string
}

export type PageRendererComponentType = DefineComponent<
  {
    data?: PageData | BlockItem[]
    navbar?: any
    footer?: any
    seo?: PageSEO | boolean
  },
  {},
  any,
  {},
  {},
  {},
  {},
  {
    submit: (payload: any, context: SubmitContext) => void
  }
>

export const PageRenderer: PageRendererComponentType
export const PageRendererComponent: PageRendererComponentType
export const pageRendererDefaultData: PageData
export const builtInBlocks: Record<string, any>

// 工具函数声明
export declare function mergeData<T extends Record<string, any>>(defaults: T, custom?: Partial<T>): T
export declare function mergeStyles<T extends Record<string, string>>(defaultStyles: T, customStyles?: Partial<T>): T
export declare function componentInstall<T>(component: T): T & Plugin
export declare function withInstall<T>(component: T): T & Plugin

// Vue 全局插件安装入口
export const install: (app: App) => void
declare const _default: Plugin
export default _default
