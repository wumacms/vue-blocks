import { blockRegistry } from '@vue-blocks/utils'

// 导入 22 组区块的 schema.json
import navbarSchema from './navbar/schema.json'
import heroSchema from './hero/schema.json'
import partnersSchema from './partners/schema.json'
import footerSchema from './footer/schema.json'
import featuresSchema from './features/schema.json'
import topTextBottomImageSchema from './top-text-bottom-image/schema.json'
import statsSchema from './stats/schema.json'
import leftImageRightTextSchema from './left-image-right-text/schema.json'
import rightImageLeftTextSchema from './right-image-left-text/schema.json'
import iconWallSchema from './icon-wall/schema.json'
import pricingSchema from './pricing/schema.json'
import comparisonTableSchema from './comparison-table/schema.json'
import ctaSchema from './cta/schema.json'
import testimonialsSchema from './testimonials/schema.json'
import faqSchema from './faq/schema.json'
import contactFormSchema from './contact-form/schema.json'
import serviceListSchema from './service-list/schema.json'
import productListSchema from './product-list/schema.json'
import courseListSchema from './course-list/schema.json'
import teamSchema from './team/schema.json'
import newsListSchema from './news-list/schema.json'
import newsDetailSchema from './news-detail/schema.json'

// 导入组件对象
import NavbarBlock from './navbar/NavbarBlock.vue'
import HeroBlock from './hero/HeroBlock.vue'
import PartnersBlock from './partners/PartnersBlock.vue'
import FooterBlock from './footer/FooterBlock.vue'
import FeaturesBlock from './features/FeaturesBlock.vue'
import TopTextBottomImageBlock from './top-text-bottom-image/TopTextBottomImageBlock.vue'
import StatsBlock from './stats/StatsBlock.vue'
import LeftImageRightTextBlock from './left-image-right-text/LeftImageRightTextBlock.vue'
import RightImageLeftTextBlock from './right-image-left-text/RightImageLeftTextBlock.vue'
import IconWallBlock from './icon-wall/IconWallBlock.vue'
import PricingBlock from './pricing/PricingBlock.vue'
import ComparisonTableBlock from './comparison-table/ComparisonTableBlock.vue'
import CtaBlock from './cta/CtaBlock.vue'
import TestimonialsBlock from './testimonials/TestimonialsBlock.vue'
import FaqBlock from './faq/FaqBlock.vue'
import ContactFormBlock from './contact-form/ContactFormBlock.vue'
import ServiceListBlock from './service-list/ServiceListBlock.vue'
import ProductListBlock from './product-list/ProductListBlock.vue'
import CourseListBlock from './course-list/CourseListBlock.vue'
import TeamBlock from './team/TeamBlock.vue'
import NewsListBlock from './news-list/NewsListBlock.vue'
import NewsDetailBlock from './news-detail/NewsDetailBlock.vue'

// 导入默认数据
import { defaultData as navbarDefaultData } from './navbar/defaultData.js'
import { defaultData as heroDefaultData } from './hero/defaultData.js'
import { defaultData as partnersDefaultData } from './partners/defaultData.js'
import { defaultData as footerDefaultData } from './footer/defaultData.js'
import { defaultData as featuresDefaultData } from './features/defaultData.js'
import { defaultData as topTextBottomImageDefaultData } from './top-text-bottom-image/defaultData.js'
import { defaultData as statsDefaultData } from './stats/defaultData.js'
import { defaultData as leftImageRightTextDefaultData } from './left-image-right-text/defaultData.js'
import { defaultData as rightImageLeftTextDefaultData } from './right-image-left-text/defaultData.js'
import { defaultData as iconWallDefaultData } from './icon-wall/defaultData.js'
import { defaultData as pricingDefaultData } from './pricing/defaultData.js'
import { defaultData as comparisonTableDefaultData } from './comparison-table/defaultData.js'
import { defaultData as ctaDefaultData } from './cta/defaultData.js'
import { defaultData as testimonialsDefaultData } from './testimonials/defaultData.js'
import { defaultData as faqDefaultData } from './faq/defaultData.js'
import { defaultData as contactFormDefaultData } from './contact-form/defaultData.js'
import { defaultData as serviceListDefaultData } from './service-list/defaultData.js'
import { defaultData as productListDefaultData } from './product-list/defaultData.js'
import { defaultData as courseListDefaultData } from './course-list/defaultData.js'
import { defaultData as teamDefaultData } from './team/defaultData.js'
import { defaultData as newsListDefaultData } from './news-list/defaultData.js'
import { defaultData as newsDetailDefaultData } from './news-detail/defaultData.js'

/**
 * 物料分类体系定义
 */
export const CATEGORY_DEFINITIONS = [
  { id: 'all', name: '全部物料', icon: 'Layers' },
  { id: 'base', name: '基础骨架', icon: 'Compass', desc: '导航栏、首屏主视觉、合作伙伴与页脚' },
  { id: 'content', name: '内容展示', icon: 'Sparkles', desc: '特性卡片、图文排版、数据指标与图标墙' },
  { id: 'conversion', name: '业务转化', icon: 'CreditCard', desc: '价格表、能力对比、CTA 横幅、用户评价与咨询表单' },
  { id: 'list', name: '列表资讯', icon: 'ListOrdered', desc: '服务项目、产品橱窗、团队成员与新闻资讯' }
]

/**
 * 22 组全量物料清单定义（Manifests）
 */
export const BLOCK_MANIFESTS = [
  // 1. 基础骨架 (base)
  {
    name: 'NavbarBlock',
    title: '顶部导航栏',
    category: 'base',
    icon: 'Compass',
    description: '支持品牌 Logo、多级下拉菜单、吸顶效果与移动端汉堡折叠',
    supports: { variant: true, theme: true },
    fields: navbarSchema
  },
  {
    name: 'HeroBlock',
    title: '主视觉首屏',
    category: 'base',
    icon: 'LayoutTemplate',
    description: '首屏强吸引力排版，包含主副标语、双行动按钮与高保真主图',
    supports: { variant: true, theme: true },
    fields: heroSchema
  },
  {
    name: 'PartnersBlock',
    title: '合作伙伴 Logo 墙',
    category: 'base',
    icon: 'Building2',
    description: '展示合作品牌、标杆客户与权威背书 Logo 矩阵',
    supports: { variant: true, theme: true },
    fields: partnersSchema
  },
  {
    name: 'FooterBlock',
    title: '全局通用页脚',
    category: 'base',
    icon: 'PanelBottom',
    description: '多列站点导航、版权信息、社交网络入口与合规备案号',
    supports: { variant: true, theme: true },
    fields: footerSchema
  },

  // 2. 内容展示 (content)
  {
    name: 'FeaturesBlock',
    title: '核心特性卡片',
    category: 'content',
    icon: 'Sparkles',
    description: '多列功能亮点网格，带拟物或极简图标与描述',
    supports: { variant: true, theme: true },
    fields: featuresSchema
  },
  {
    name: 'TopTextBottomImageBlock',
    title: '上文下图展示',
    category: 'content',
    icon: 'Image',
    description: '居中大标题叙事排版，下方配以大尺寸界面或硬件产品渲染图',
    supports: { variant: true, theme: true },
    fields: topTextBottomImageSchema
  },
  {
    name: 'StatsBlock',
    title: '关键数据统计',
    category: 'content',
    icon: 'BarChart3',
    description: '突出显示核心运营指标、量化成果与数字化商业里程碑',
    supports: { variant: true, theme: true },
    fields: statsSchema
  },
  {
    name: 'LeftImageRightTextBlock',
    title: '左图右文图文排版',
    category: 'content',
    icon: 'SplitSquareVertical',
    description: '左侧场景大图，右侧详尽叙事文案与特性要点清单',
    supports: { variant: true, theme: true },
    fields: leftImageRightTextSchema
  },
  {
    name: 'RightImageLeftTextBlock',
    title: '左文右图图文排版',
    category: 'content',
    icon: 'SplitSquareVertical',
    description: '左侧产品说明，右侧高质感图表或插图，与左图右文形成交错节奏',
    supports: { variant: true, theme: true },
    fields: rightImageLeftTextSchema
  },
  {
    name: 'IconWallBlock',
    title: '生产力图标墙',
    category: 'content',
    icon: 'Grid',
    description: '展示丰富集成工具、生态插件与技术栈支持的致密图标卡片',
    supports: { variant: true, theme: true },
    fields: iconWallSchema
  },

  // 3. 业务转化 (conversion)
  {
    name: 'PricingBlock',
    title: '价格方案对比',
    category: 'conversion',
    icon: 'CreditCard',
    description: '阶梯套餐卡片，支持月付/年付切换、推荐标签与功能勾选单',
    supports: { variant: true, theme: true },
    fields: pricingSchema
  },
  {
    name: 'ComparisonTableBlock',
    title: '产品能力对比表',
    category: 'conversion',
    icon: 'Table2',
    description: '精细化版本功能对比或竞品能力对比清单',
    supports: { variant: true, theme: true },
    fields: comparisonTableSchema
  },
  {
    name: 'CtaBlock',
    title: '行动号召横幅',
    category: 'conversion',
    icon: 'Megaphone',
    description: '页面底部强转化号召，引导用户立即免费试用或预约演示',
    supports: { variant: true, theme: true },
    fields: ctaSchema
  },
  {
    name: 'TestimonialsBlock',
    title: '用户与客户评价',
    category: 'conversion',
    icon: 'Quote',
    description: '真实用户评价与客户口碑卡片，包含头像、职位与评星',
    supports: { variant: true, theme: true },
    fields: testimonialsSchema
  },
  {
    name: 'FaqBlock',
    title: '常见问题手风琴',
    category: 'conversion',
    icon: 'HelpCircle',
    description: '折叠式手风琴常见问题答疑，消除潜在客户转化疑虑',
    supports: { variant: true, theme: true },
    fields: faqSchema
  },
  {
    name: 'ContactFormBlock',
    title: '咨询与联系表单',
    category: 'conversion',
    icon: 'Mail',
    description: '企业咨询留言表单，支持输入姓名、邮箱、需求并触发提交事件',
    supports: { variant: true, theme: true },
    fields: contactFormSchema
  },

  // 4. 列表资讯 (list)
  {
    name: 'ServiceListBlock',
    title: '服务项目列表',
    category: 'list',
    icon: 'Briefcase',
    description: '展示企业提供的专业技术服务、咨询方案或解决方案',
    supports: { variant: true, theme: true },
    fields: serviceListSchema
  },
  {
    name: 'ProductListBlock',
    title: '产品展示列表',
    category: 'list',
    icon: 'ShoppingBag',
    description: '精选硬件、软件或数字商品矩阵，支持标签与价格说明',
    supports: { variant: true, theme: true },
    fields: productListSchema
  },
  {
    name: 'CourseListBlock',
    title: '课程与培训列表',
    category: 'list',
    icon: 'GraduationCap',
    description: '在线课程、技能培训或工作坊列表，带讲师信息与难度分级',
    supports: { variant: true, theme: true },
    fields: courseListSchema
  },
  {
    name: 'TeamBlock',
    title: '核心团队成员',
    category: 'list',
    icon: 'Users',
    description: '创始人与核心骨干团队介绍，附带社交链接与个人头衔',
    supports: { variant: true, theme: true },
    fields: teamSchema
  },
  {
    name: 'NewsListBlock',
    title: '资讯新闻列表',
    category: 'list',
    icon: 'Newspaper',
    description: '企业动态、媒体报道与行业洞察列表展示',
    supports: { variant: true, theme: true },
    fields: newsListSchema
  },
  {
    name: 'NewsDetailBlock',
    title: '资讯正文排版',
    category: 'list',
    icon: 'FileText',
    description: '高可读性文章正文排版，支持署名、发布日期与富文本段落',
    supports: { variant: true, theme: true },
    fields: newsDetailSchema
  }
]

/**
 * 组件、默认数据与清单映射合集
 */
const RAW_ENTRIES = [
  { type: 'NavbarBlock', component: NavbarBlock, defaultData: navbarDefaultData },
  { type: 'HeroBlock', component: HeroBlock, defaultData: heroDefaultData },
  { type: 'PartnersBlock', component: PartnersBlock, defaultData: partnersDefaultData },
  { type: 'FooterBlock', component: FooterBlock, defaultData: footerDefaultData },
  { type: 'FeaturesBlock', component: FeaturesBlock, defaultData: featuresDefaultData },
  { type: 'TopTextBottomImageBlock', component: TopTextBottomImageBlock, defaultData: topTextBottomImageDefaultData },
  { type: 'StatsBlock', component: StatsBlock, defaultData: statsDefaultData },
  { type: 'LeftImageRightTextBlock', component: LeftImageRightTextBlock, defaultData: leftImageRightTextDefaultData },
  { type: 'RightImageLeftTextBlock', component: RightImageLeftTextBlock, defaultData: rightImageLeftTextDefaultData },
  { type: 'IconWallBlock', component: IconWallBlock, defaultData: iconWallDefaultData },
  { type: 'PricingBlock', component: PricingBlock, defaultData: pricingDefaultData },
  { type: 'ComparisonTableBlock', component: ComparisonTableBlock, defaultData: comparisonTableDefaultData },
  { type: 'CtaBlock', component: CtaBlock, defaultData: ctaDefaultData },
  { type: 'TestimonialsBlock', component: TestimonialsBlock, defaultData: testimonialsDefaultData },
  { type: 'FaqBlock', component: FaqBlock, defaultData: faqDefaultData },
  { type: 'ContactFormBlock', component: ContactFormBlock, defaultData: contactFormDefaultData },
  { type: 'ServiceListBlock', component: ServiceListBlock, defaultData: serviceListDefaultData },
  { type: 'ProductListBlock', component: ProductListBlock, defaultData: productListDefaultData },
  { type: 'CourseListBlock', component: CourseListBlock, defaultData: courseListDefaultData },
  { type: 'TeamBlock', component: TeamBlock, defaultData: teamDefaultData },
  { type: 'NewsListBlock', component: NewsListBlock, defaultData: newsListDefaultData },
  { type: 'NewsDetailBlock', component: NewsDetailBlock, defaultData: newsDetailDefaultData }
]

// 自动向全局 blockRegistry 注册包含 manifest 与 defaultData 的全量条目
RAW_ENTRIES.forEach((item) => {
  const manifest = BLOCK_MANIFESTS.find((m) => m.name === item.type) || null
  blockRegistry.register({
    type: item.type,
    component: item.component,
    manifest,
    defaultData: item.defaultData
  })
})

export default BLOCK_MANIFESTS
