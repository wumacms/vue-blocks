export const defaultStyles = {
'1': {
 root:'py-20 bg-card text-card-foreground transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-4xl font-bold text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
 card:'text-center p-6 rounded-2xl bg-card border border-border hover:bg-muted/50 transition',
 avatar:'w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-2 border-border',
 name:'text-lg font-bold text-foreground',
 role:'text-sm text-primary font-medium mt-1'
 },
'2': {
 root:'py-20 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight',
 description:'text-lg text-foreground/80 font-semibold',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
 card:'text-center p-6 rounded-3xl bg-card border-4 border-foreground shadow-[8px_8px_0_var(--color-foreground)] hover:shadow-[3px_3px_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 transition-all',
 avatar:'w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-foreground shadow-[4px_4px_0_var(--color-foreground)]',
 name:'text-xl font-black text-foreground',
 role:'text-sm font-black text-primary dark:text-[var(--color-primary)] mt-1 uppercase tracking-wide'
 },
'3': {
 root:'py-20 bg-background transition-colors duration-300 border-b border-border',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'font-serif text-3xl md:text-5xl font-medium tracking-[-0.5px] text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
 card:'text-center p-6 rounded-xl bg-transparent transition-colors',
 avatar:'w-28 h-28 rounded-full mx-auto mb-4 object-cover border border-border',
 name:'text-lg font-semibold text-foreground',
 role:'text-sm text-[var(--color-muted-foreground)] dark:text-muted-foreground mt-1'
 },
'4': {
 root:'py-20 bg-background border-b-2 border-foreground transition-colors duration-200',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground mb-4',
 description:'text-base md:text-lg text-muted-foreground font-medium',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
 card:'text-center p-6 bg-card border-2 border-foreground shadow-[4px_4px_0_var(--color-foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-foreground)] transition-all -rotate-1 hover:rotate-0',
 avatar:'w-24 h-24 mx-auto mb-4 object-cover border-2 border-foreground shadow-[3px_3px_0_var(--color-foreground)]',
 name:'text-lg font-extrabold uppercase tracking-tight text-foreground',
 role:'text-xs font-bold uppercase tracking-wider text-primary mt-1'
 }
}
export default defaultStyles
