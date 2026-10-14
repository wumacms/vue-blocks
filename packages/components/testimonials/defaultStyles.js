export const defaultStyles = {
  '1': {
    root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16 max-w-3xl mx-auto',
    title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
    description: 'text-lg text-gray-600 dark:text-gray-400',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    card: 'bg-gray-50 dark:bg-gray-800/60 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition',
    stars: 'text-amber-400 text-lg mb-4 tracking-wider',
    quote: 'text-gray-700 dark:text-gray-300 text-base leading-relaxed italic mb-6 flex-1',
    authorWrapper: 'flex items-center gap-4 pt-4 border-t border-gray-200/60 dark:border-gray-700',
    avatar: 'w-12 h-12 rounded-full object-cover shrink-0 shadow-sm',
    authorName: 'font-bold text-gray-900 dark:text-white text-sm',
    authorRole: 'text-xs text-gray-500 dark:text-gray-400'
  },
  '2': {
    root: 'py-20 bg-[#e9e2ff] dark:bg-[#1a103d] border-b-4 border-[#ffb347] transition-colors duration-300 relative overflow-hidden',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16 max-w-3xl mx-auto',
    title: 'text-3xl md:text-5xl font-black text-[#120b48] dark:text-white mb-4 tracking-tight',
    description: 'text-lg text-[#2c1b6b] dark:text-[#c4b5fd] font-semibold',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    card: 'bg-white dark:bg-[#2c1b6b] p-8 rounded-3xl border-4 border-[#120b48] dark:border-[#ffb347] shadow-[8px_8px_0_#ff5c8a] dark:shadow-[8px_8px_0_#b47aff] flex flex-col justify-between hover:shadow-[3px_3px_0_#ff5c8a] dark:hover:shadow-[3px_3px_0_#b47aff] hover:translate-x-1 hover:translate-y-1 transition-all',
    stars: 'text-[#ffb347] text-xl mb-4 tracking-widest drop-shadow-[2px_2px_0_#120b48]',
    quote: 'text-[#120b48] dark:text-white text-base font-bold leading-relaxed mb-6 flex-1',
    authorWrapper: 'flex items-center gap-4 pt-4 border-t-2 border-[#120b48]/20 dark:border-[#ffb347]/30',
    avatar: 'w-12 h-12 rounded-full object-cover shrink-0 border-2 border-[#120b48] dark:border-[#ffb347] shadow-[2px_2px_0_#ff5c8a]',
    authorName: 'font-black text-[#120b48] dark:text-white text-base',
    authorRole: 'text-xs font-bold text-[#ff5c8a] dark:text-[#c4b5fd]'
  },
  '3': {
    root: 'py-20 bg-[#faf9f5] dark:bg-[#141413] transition-colors duration-300 border-b border-[#e6dfd8] dark:border-[#2a2824]',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16 max-w-3xl mx-auto',
    title: 'font-serif text-3xl md:text-5xl font-medium tracking-[-0.5px] text-[#141413] dark:text-[#faf9f5] mb-4',
    description: 'text-lg text-[#3d3d3a] dark:text-[#d4d0c8]',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7',
    card: 'bg-[#efe9de] dark:bg-[#252320] p-7 rounded-xl border border-transparent hover:border-[#e6dfd8] dark:hover:border-[#2a2824] transition-colors flex flex-col justify-between',
    stars: 'text-[#e8a55a] text-base mb-4 tracking-wider',
    quote: 'text-[#3d3d3a] dark:text-[#d4d0c8] text-sm leading-relaxed mb-6 flex-1',
    authorWrapper: 'flex items-center gap-3 pt-4 border-t border-[#e6dfd8]/60 dark:border-[#2a2824]',
    avatar: 'w-10 h-10 rounded-full object-cover shrink-0 border border-[#e6dfd8] dark:border-[#2a2824]',
    authorName: 'font-semibold text-[#141413] dark:text-[#faf9f5] text-sm',
    authorRole: 'text-xs text-[#6c6a64] dark:text-[#a09d96]'
  },
  '4': {
    root: 'py-20 bg-slate-50 dark:bg-slate-900 border-b-2 border-black dark:border-white transition-colors duration-200',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    header: 'text-center mb-16 max-w-3xl mx-auto',
    title: 'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white mb-4',
    description: 'text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    card: 'bg-white dark:bg-slate-800 p-8 border-2 border-black dark:border-white shadow-[4px_4px_0_black] dark:shadow-[4px_4px_0_white] -rotate-1 hover:rotate-0 hover:scale-[1.01] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_black] dark:hover:shadow-[8px_8px_0_white] transition-all flex flex-col justify-between',
    stars: 'text-amber-500 text-lg mb-4 tracking-wider',
    quote: 'text-slate-800 dark:text-slate-200 text-sm md:text-base font-medium leading-relaxed mb-6 flex-1',
    authorWrapper: 'flex items-center gap-4 pt-4 border-t-2 border-black dark:border-white',
    avatar: 'w-12 h-12 object-cover shrink-0 border-2 border-black dark:border-white shadow-[2px_2px_0_black]',
    authorName: 'font-extrabold uppercase text-slate-900 dark:text-white text-sm',
    authorRole: 'text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400'
  }
}
export default defaultStyles
