export const defaultStyles = {
'1': {
 root:'py-20 bg-muted transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-4xl font-bold text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
 card:'bg-card text-card-foreground p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col',
 iconWrapper:'w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-6',
 cardTitle:'text-xl font-bold text-foreground mb-2',
 cardDescription:'text-muted-foreground text-sm leading-relaxed'
 },
'2': {
 root:'py-20 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight tracking-tight',
 description:'text-lg text-foreground/80 font-semibold',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
 card:'bg-card p-8 rounded-3xl border-4 border-foreground shadow-[8px_8px_0_var(--color-foreground)] hover:shadow-[3px_3px_0_var(--color-foreground)] hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col',
    iconWrapper: 'w-14 h-14 bg-primary text-primary-foreground rounded-2xl border-3 border-foreground flex items-center justify-center text-3xl mb-6 shadow-[3px_3px_0_var(--color-foreground)]',
 cardTitle:'text-xl font-black text-foreground mb-3',
 cardDescription:'text-foreground/80 text-sm font-medium leading-relaxed'
 },
'3': {
 root:'py-20 bg-background transition-colors duration-300 border-b border-border',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'font-serif text-3xl md:text-5xl font-medium tracking-[-0.5px] text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
 card:'bg-[var(--color-muted)] dark:bg-[var(--color-muted)] p-7 rounded-xl border border-transparent hover:border-[var(--color-border)] dark:hover:border-[var(--color-border)] transition-colors duration-200 flex flex-col',
 iconWrapper:'w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-5 text-primary',
 cardTitle:'text-xl font-semibold text-foreground mb-2',
 cardDescription:'text-muted-foreground text-sm leading-relaxed'
 },
'4': {
 root:'py-20 bg-background border-b-2 border-foreground transition-colors duration-200',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground mb-4',
 description:'text-base md:text-lg text-muted-foreground font-medium',
 grid:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
 card:'relative p-6 border-2 border-foreground bg-card border-l-8 border-l-primary shadow-[4px_4px_0_var(--color-foreground)] -rotate-1 hover:rotate-0 hover:scale-[1.01] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-foreground)] transition-all duration-200 flex flex-col',
 iconWrapper:'w-12 h-12 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center text-2xl mb-4 shadow-[3px_3px_0_var(--color-foreground)]',
 cardTitle:'text-xl font-extrabold uppercase tracking-tight text-foreground mb-2',
 cardDescription:'text-muted-foreground text-sm leading-relaxed font-normal'
 }
}
export default defaultStyles
