export const defaultStyles = {
'1': {
 root:'py-16 bg-card text-card-foreground border-y border-border transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-12 max-w-3xl mx-auto',
 title:'text-2xl md:text-3xl font-bold text-foreground mb-2',
 description:'text-sm md:text-base text-muted-foreground',
 logoGrid:'flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75 dark:opacity-60',
 logoItem:'transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105 hover:opacity-100 flex flex-col items-center justify-center p-2',
 logoImg:'h-8 md:h-10 w-auto object-contain',
 logoName:'text-xs text-muted-foreground mt-1'
 },
'2': {
 root:'py-16 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-12 max-w-3xl mx-auto',
 title:'text-2xl md:text-4xl font-black text-foreground mb-2 tracking-tight',
 description:'text-sm md:text-base text-foreground/80 font-semibold',
 logoGrid:'flex flex-wrap justify-center items-center gap-6 md:gap-8',
 logoItem:'bg-card px-6 py-4 rounded-2xl border-3 border-foreground shadow-[4px_4px_0_var(--color-foreground)] hover:shadow-[1px_1px_0_var(--color-foreground)] dark:hover:shadow-[1px_1px_0_var(--color-foreground)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col items-center justify-center',
 logoImg:'h-8 md:h-10 w-auto object-contain',
 logoName:'text-sm font-black text-foreground mt-1'
 },
'3': {
 root:'py-10 bg-[var(--color-muted)] dark:bg-[var(--color-muted)] border-b border-border transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-8 max-w-3xl mx-auto',
 title:'font-serif text-2xl md:text-3xl font-medium text-foreground mb-2',
 description:'text-sm text-[var(--color-muted-foreground)] dark:text-muted-foreground',
 logoGrid:'flex flex-wrap justify-center items-center gap-8 md:gap-12',
 logoItem:'transition-colors duration-200 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 flex flex-col items-center justify-center p-2',
 logoImg:'h-7 md:h-9 w-auto object-contain',
 logoName:'text-xs text-muted-foreground mt-1 font-medium'
 },
'4': {
 root:'py-12 bg-muted border-y-2 border-foreground transition-colors duration-200 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-8 max-w-3xl mx-auto',
 title:'text-xl md:text-2xl font-extrabold uppercase tracking-[0.2em] text-foreground mb-2',
 description:'text-xs md:text-sm uppercase tracking-wider font-bold text-muted-foreground',
 logoGrid:'flex flex-wrap justify-center items-center gap-6 md:gap-8',
 logoItem:'bg-card px-5 py-3 border-2 border-foreground shadow-[4px_4px_0_var(--color-foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-foreground)] transition-all flex flex-col items-center justify-center cursor-pointer -rotate-1 hover:rotate-0',
 logoImg:'h-8 md:h-10 w-auto object-contain',
 logoName:'text-xs font-bold uppercase tracking-wider text-foreground mt-1.5'
 }
}
export default defaultStyles
