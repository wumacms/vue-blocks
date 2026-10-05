export const defaultStyles = {
  '1': {
    root: 'border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    navWrapper: 'flex items-center justify-between h-16 md:h-20',
    brandWrapper: 'flex items-center gap-3 shrink-0 cursor-pointer',
    logo: 'h-8 w-auto rounded-lg shadow-sm',
    brandName: 'text-xl font-semibold text-gray-800 dark:text-white tracking-tight',
    menuNav: 'hidden md:flex items-center space-x-1 lg:space-x-2',
    menuItem: 'px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800',
    menuItemActive: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold',
    dropdownTrigger: 'flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800',
    dropdownTriggerActive: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold',
    dropdownMenu: 'absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 py-2',
    dropdownItem: 'flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition',
    dropdownItemActive: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium',
    actionsWrapper: 'flex items-center gap-3',
    ctaButton: 'hidden sm:inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors shadow-sm',
    mobileToggle: 'md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
    mobileMenu: 'md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-6 space-y-2',
    mobileMenuItem: 'block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800',
    mobileMenuItemActive: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold',
    mobileMenuGroup: 'py-1',
    mobileDropdownWrapper: 'pl-4 space-y-1 mt-1',
    mobileDropdownItem: 'flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400',
    mobileDropdownItemActive: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 font-medium',
    mobileButtonWrapper: 'pt-4 border-t border-gray-100 dark:border-gray-800',
    mobileCtaButton: 'block w-full text-center bg-indigo-600 text-white font-medium py-2.5 rounded-full shadow-sm'
  }
}
export default defaultStyles
