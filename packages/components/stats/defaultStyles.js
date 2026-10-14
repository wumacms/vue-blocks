export const defaultStyles = {
'1': {
 root:'py-16 bg-primary text-primary-foreground relative overflow-hidden transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 grid:'grid grid-cols-2 md:grid-cols-4 gap-8 text-center',
 item:'p-4',
 value:'text-4xl md:text-5xl font-black text-primary-foreground tracking-tight',
 label:'text-sm md:text-base text-primary-foreground/80 font-medium mt-2'
 },
  '2': {
    root: 'py-16 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6 text-center',
    item: 'p-6 rounded-3xl bg-card border-4 border-foreground shadow-[6px_6px_0_var(--color-foreground)] hover:shadow-[2px_2px_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col items-center justify-center',
    value: 'text-4xl md:text-6xl font-black text-foreground tracking-tight',
    label: 'text-sm md:text-base text-foreground/80 font-black mt-2 uppercase tracking-wide'
  },
  '3': {
    root: 'py-12 bg-muted border-t border-b border-border transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-8 text-center',
    item: 'p-4',
    value: 'font-serif text-4xl md:text-5xl font-medium text-foreground tracking-tight',
    label: 'mt-1 text-sm text-muted-foreground'
  },
  '4': {
    root: 'py-16 bg-primary text-primary-foreground border-y-2 border-foreground relative overflow-hidden transition-colors duration-200',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6 text-center',
    item: 'border-2 border-primary-foreground/60 p-5 bg-primary-foreground/10 -rotate-1 hover:rotate-0 hover:scale-[1.01] shadow-[6px_6px_0_var(--color-foreground)] transition-all duration-200',
    value: 'text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-primary-foreground',
    label: 'text-xs md:text-sm uppercase tracking-wider font-bold mt-2 text-primary-foreground/90'
  }
}
export default defaultStyles
