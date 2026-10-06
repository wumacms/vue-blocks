export const defaultStyles = {
  '1': {
    root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16 max-w-3xl mx-auto',
    title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
    description: 'text-lg text-gray-600 dark:text-gray-400',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    card: 'bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col',
    imageWrapper: 'relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800',
    image: 'w-full h-full object-cover transition-transform duration-300 hover:scale-105',
    tag: 'absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm',
    cardBody: 'p-6 flex-1 flex flex-col',
    productTitle: 'text-xl font-bold text-gray-900 dark:text-white mb-2',
    productDescription: 'text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1',
    footer: 'flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto',
    priceWrapper: 'flex items-baseline gap-2',
    price: 'text-2xl font-black text-gray-900 dark:text-white',
    originalPrice: 'text-sm text-gray-400 line-through',
    button: 'bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full transition shadow-sm'
  },
  '2': {
    root: 'py-20 bg-[#e9e2ff] dark:bg-[#1a103d] border-b-4 border-[#ffb347] transition-colors duration-300 relative overflow-hidden',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16 max-w-3xl mx-auto',
    title: 'text-3xl md:text-5xl font-black text-[#120b48] dark:text-white mb-4 tracking-tight',
    description: 'text-lg text-[#2c1b6b] dark:text-[#c4b5fd] font-semibold',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    card: 'bg-white dark:bg-[#2c1b6b] rounded-3xl overflow-hidden border-4 border-[#120b48] dark:border-[#ffb347] shadow-[8px_8px_0_#ff5c8a] dark:shadow-[8px_8px_0_#b47aff] hover:shadow-[3px_3px_0_#ff5c8a] dark:hover:shadow-[3px_3px_0_#b47aff] hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col',
    imageWrapper: 'relative aspect-4/3 overflow-hidden bg-[#ffb347] dark:bg-[#1a103d] border-b-4 border-[#120b48] dark:border-[#ffb347]',
    image: 'w-full h-full object-cover',
    tag: 'absolute top-3 left-3 bg-[#ff5c8a] text-white text-xs font-black px-3 py-1.5 rounded-full border-2 border-[#120b48] shadow-[2px_2px_0_#120b48]',
    cardBody: 'p-6 flex-1 flex flex-col',
    productTitle: 'text-2xl font-black text-[#120b48] dark:text-white mb-2',
    productDescription: 'text-[#2c1b6b] dark:text-[#c4b5fd] text-sm font-medium line-clamp-3 mb-6 flex-1',
    footer: 'flex items-center justify-between pt-4 border-t-2 border-[#120b48]/20 dark:border-[#ffb347]/30 mt-auto',
    priceWrapper: 'flex items-baseline gap-2',
    price: 'text-2xl font-black text-[#120b48] dark:text-[#ffb347]',
    originalPrice: 'text-sm text-[#ff5c8a] line-through font-bold',
    button: 'bg-[#120b48] dark:bg-[#ffb347] text-white dark:text-[#120b48] text-sm font-black px-5 py-2.5 rounded-full border-3 border-[#ffb347] dark:border-[#ff5c8a] shadow-[4px_4px_0_#ff5c8a] dark:shadow-[4px_4px_0_#b47aff] hover:shadow-[1px_1px_0_#ff5c8a] transition-all'
  }
}
export default defaultStyles
