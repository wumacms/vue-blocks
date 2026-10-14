export const defaultStyles = {
'1': {
 root:'py-20 bg-card text-card-foreground transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16 max-w-3xl mx-auto',
 title:'text-3xl md:text-4xl font-bold text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 grid:'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
 card:'bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition',
 stars:'text-primary text-lg mb-4 tracking-wider',
 quote:'text-muted-foreground text-base leading-relaxed italic mb-6 flex-1',
 authorWrapper:'flex items-center gap-4 pt-4 border-t border-border',
 avatar:'w-12 h-12 rounded-full object-cover shrink-0 shadow-sm',
 authorName:'font-bold text-foreground text-sm',
 authorRole:'text-xs text-muted-foreground'
 },
'2': {
 root:'py-20 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16 max-w-3xl mx-auto',
 title:'text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight',
 description:'text-lg text-foreground/80 font-semibold',
 grid:'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
 card:'bg-card p-8 rounded-3xl border-4 border-foreground shadow-[8px_8px_0_var(--color-foreground)] flex flex-col justify-between hover:shadow-[3px_3px_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 transition-all',
 stars:'text-[var(--color-primary)] text-xl mb-4 tracking-widest drop-shadow-[2px_2px_0_var(--color-foreground)]',
 quote:'text-foreground text-base font-bold leading-relaxed mb-6 flex-1',
 authorWrapper:'flex items-center gap-4 pt-4 border-t-2 border-foreground/20',
 avatar:'w-12 h-12 rounded-full object-cover shrink-0 border-2 border-foreground shadow-[2px_2px_0_var(--color-foreground)]',
 authorName:'font-black text-foreground text-base',
 authorRole:'text-xs font-bold text-primary dark:text-foreground/80'
 },
'3': {
 root:'py-20 bg-background transition-colors duration-300 border-b border-border',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16 max-w-3xl mx-auto',
 title:'font-serif text-3xl md:text-5xl font-medium tracking-[-0.5px] text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 grid:'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7',
 card:'bg-[var(--color-muted)] dark:bg-[var(--color-muted)] p-7 rounded-xl border border-transparent hover:border-[var(--color-border)] dark:hover:border-[var(--color-border)] transition-colors flex flex-col justify-between',
 stars:'text-[var(--color-primary)] text-base mb-4 tracking-wider',
 quote:'text-muted-foreground text-sm leading-relaxed mb-6 flex-1',
 authorWrapper:'flex items-center gap-3 pt-4 border-t border-[var(--color-border)]/60 dark:border-[var(--color-border)]',
 avatar:'w-10 h-10 rounded-full object-cover shrink-0 border border-border',
 authorName:'font-semibold text-foreground text-sm',
 authorRole:'text-xs text-[var(--color-muted-foreground)] dark:text-muted-foreground'
 },
'4': {
 root:'py-20 bg-background border-b-2 border-foreground transition-colors duration-200',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16 max-w-3xl mx-auto',
 title:'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground mb-4',
 description:'text-base md:text-lg text-muted-foreground font-medium',
 grid:'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
 card:'bg-card p-8 border-2 border-foreground shadow-[4px_4px_0_var(--color-foreground)] -rotate-1 hover:rotate-0 hover:scale-[1.01] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-foreground)] transition-all flex flex-col justify-between',
 stars:'text-primary text-lg mb-4 tracking-wider',
 quote:'text-foreground text-sm md:text-base font-medium leading-relaxed mb-6 flex-1',
 authorWrapper:'flex items-center gap-4 pt-4 border-t-2 border-foreground',
 avatar:'w-12 h-12 object-cover shrink-0 border-2 border-foreground shadow-[2px_2px_0_var(--color-foreground)]',
 authorName:'font-extrabold uppercase text-foreground text-sm',
 authorRole:'text-xs font-bold uppercase tracking-wider text-muted-foreground'
 }
}
export default defaultStyles
