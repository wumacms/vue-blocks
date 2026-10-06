export const defaultStyles = {
  '1': {
    root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
    container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16',
    title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
    description: 'text-lg text-gray-600 dark:text-gray-400',
    accordionList: 'space-y-4',
    item: 'border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-200 bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer',
    itemActive: 'border-indigo-500/40 dark:border-indigo-500/40 bg-white dark:bg-gray-800 shadow-sm',
    trigger: 'flex justify-between items-center w-full text-left font-semibold text-gray-900 dark:text-white text-lg',
    icon: 'w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 shrink-0 ml-4',
    iconOpen: 'rotate-180',
    content: 'mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base border-t border-gray-100 dark:border-gray-700/60 pt-4'
  },
  '2': {
    root: 'py-20 bg-[#e9e2ff] dark:bg-[#1a103d] border-b-4 border-[#ffb347] transition-colors duration-300 relative overflow-hidden',
    container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16',
    title: 'text-3xl md:text-5xl font-black text-[#120b48] dark:text-white mb-4 tracking-tight',
    description: 'text-lg text-[#2c1b6b] dark:text-[#c4b5fd] font-semibold',
    accordionList: 'space-y-5',
    item: 'border-4 border-[#120b48] dark:border-[#ffb347] rounded-3xl p-6 transition-all bg-white dark:bg-[#2c1b6b] shadow-[6px_6px_0_#ff5c8a] dark:shadow-[6px_6px_0_#b47aff] cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#ff5c8a] dark:hover:shadow-[2px_2px_0_#b47aff]',
    itemActive: 'bg-[#fdfaff] dark:bg-[#231557] border-4 border-[#ff5c8a] dark:border-[#ffb347] shadow-[8px_8px_0_#ffb347] dark:shadow-[8px_8px_0_#ff5c8a]',
    trigger: 'flex justify-between items-center w-full text-left font-black text-[#120b48] dark:text-white text-lg md:text-xl',
    icon: 'w-7 h-7 text-[#120b48] dark:text-[#ffb347] transition-transform duration-200 shrink-0 ml-4 font-black',
    iconOpen: 'rotate-180 text-[#ff5c8a]',
    content: 'mt-4 text-[#2c1b6b] dark:text-[#c4b5fd] font-medium leading-relaxed text-base border-t-2 border-[#120b48]/15 dark:border-[#ffb347]/30 pt-4'
  }
}
export default defaultStyles
