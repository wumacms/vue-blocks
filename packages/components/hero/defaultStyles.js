export const defaultStyles = {
  '1': {
    root: 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased relative bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 pt-16 pb-20 overflow-hidden transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    contentWrapper: 'text-center max-w-3xl mx-auto',
    title: 'text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6',
    description: 'text-lg text-gray-600 dark:text-gray-400 mb-10',
    buttonGroup: 'flex flex-wrap gap-4 justify-center',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition',
    buttonSecondary: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium shadow-sm transition',
    mediaWrapper: 'mt-16 max-w-5xl mx-auto',
    image: 'rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full h-auto object-cover'
  },
  '2': {
    root: 'bg-[#e9e2ff] dark:bg-[#1a103d] border-b-4 border-[#ffb347] dark:border-[#ffb347] relative overflow-hidden pt-16 pb-20 transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    contentWrapper: 'text-center max-w-3xl mx-auto',
    title: 'text-4xl md:text-5xl font-black tracking-tight text-[#120b48] dark:text-white mb-6 leading-[1.1]',
    description: 'text-lg text-[#2c1b6b] dark:text-[#c4b5fd] mb-10 font-medium',
    buttonGroup: 'flex flex-wrap gap-4 justify-center',
    buttonPrimary: 'px-8 py-4 bg-[#120b48] dark:bg-[#ffb347] text-white dark:text-[#120b48] font-bold rounded-full border-4 border-[#ffb347] dark:border-[#ff5c8a] shadow-[6px_6px_0_#ff5c8a] dark:shadow-[6px_6px_0_#b47aff] hover:shadow-[2px_2px_0_#ff5c8a] dark:hover:shadow-[2px_2px_0_#b47aff] transition',
    buttonSecondary: 'px-8 py-4 bg-white dark:bg-[#2c1b6b] text-[#120b48] dark:text-white font-bold rounded-full border-4 border-[#ff5c8a] dark:border-[#ffb347] shadow-[6px_6px_0_#b47aff] dark:shadow-[6px_6px_0_#ff5c8a] hover:shadow-[2px_2px_0_#b47aff] dark:hover:shadow-[2px_2px_0_#ff5c8a] transition',
    mediaWrapper: 'mt-16 max-w-5xl mx-auto',
    imageBox: 'bg-[#ffb347] dark:bg-[#2c1b6b] w-full h-80 md:h-96 rounded-3xl overflow-hidden border-4 border-[#120b48] dark:border-[#ffb347] shadow-[20px_20px_0_#ff5c8a] dark:shadow-[20px_20px_0_#b47aff]',
    image: 'w-full h-full object-cover opacity-90'
  },
  '3': {
    root: 'bg-gradient-to-b from-zinc-100 to-white dark:from-black dark:to-zinc-900 overflow-hidden transition-colors duration-300 py-20 md:py-28',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid md:grid-cols-2 gap-12 items-center',
    contentWrapper: 'space-y-6',
    title: 'text-5xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white',
    description: 'text-xl text-gray-600 dark:text-gray-300 max-w-lg',
    buttonGroup: 'flex flex-wrap gap-4 pt-4',
    buttonPrimary: 'bg-yellow-400 dark:bg-yellow-300 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-yellow-400/40 dark:shadow-yellow-300/40 hover:bg-yellow-300 dark:hover:bg-yellow-200 transition',
    buttonSecondary: 'border-2 border-yellow-500 dark:border-yellow-300 text-yellow-600 dark:text-yellow-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 dark:hover:bg-yellow-300 hover:text-black dark:hover:text-black transition',
    mediaWrapper: 'relative',
    image: 'rounded-3xl border-4 border-yellow-400/30 dark:border-yellow-300/30 shadow-2xl w-full h-auto'
  },
  '4': {
    root: 'relative bg-cover bg-center py-32 md:py-48 text-white transition-all duration-300',
    overlay: 'absolute inset-0 bg-black/60 backdrop-blur-[2px]',
    container: 'relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10',
    title: 'text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight',
    description: 'text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto',
    buttonGroup: 'flex flex-wrap gap-4 justify-center',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold transition'
  }
}
export default defaultStyles
