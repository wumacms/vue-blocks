export const defaultStyles = {
'1': {
 root:'py-20 bg-card text-card-foreground transition-colors duration-300',
 container:'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16',
 title:'text-3xl md:text-4xl font-bold text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 accordionList:'space-y-4',
 item:'border border-border rounded-2xl p-6 transition-all duration-200 bg-card hover:bg-muted/60 cursor-pointer',
 itemActive:'border-primary ring-1 ring-primary/40 bg-card shadow-sm',
 trigger:'flex justify-between items-center w-full text-left font-semibold text-foreground text-lg',
 icon:'w-5 h-5 text-primary transition-transform duration-200 shrink-0 ml-4',
 iconOpen:'rotate-180',
 content:'mt-4 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-border pt-4',
 strokeWidth: 2
 },
'2': {
 root:'py-20 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16',
 title:'text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight',
 description:'text-lg text-foreground/80 font-semibold',
 accordionList:'space-y-5',
 item:'border-4 border-foreground rounded-3xl p-6 transition-all bg-card shadow-[6px_6px_0_var(--color-foreground)] cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--color-foreground)]',
 itemActive:'bg-card text-foreground border-4 border-primary shadow-[8px_8px_0_var(--color-foreground)] ring-4 ring-primary/20',
 trigger:'flex justify-between items-center w-full text-left font-black text-foreground text-lg md:text-xl',
 icon:'w-7 h-7 text-foreground transition-transform duration-200 shrink-0 ml-4 font-black',
 iconOpen:'rotate-180 text-primary',
 content:'mt-4 text-foreground/80 font-medium leading-relaxed text-base border-t-2 border-foreground/15 pt-4',
 strokeWidth: 3
 },
'3': {
 root:'py-20 bg-background transition-colors duration-300 border-b border-border',
 container:'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16',
 title:'font-serif text-3xl md:text-5xl font-medium tracking-[-0.5px] text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 accordionList:'space-y-4',
 item:'border border-border rounded-xl p-5 transition-colors duration-200 bg-card hover:bg-muted cursor-pointer',
 itemActive:'bg-card border-[var(--color-primary)] dark:border-[var(--color-primary)]',
 trigger:'flex justify-between items-center w-full text-left font-semibold text-foreground text-lg',
 icon:'w-5 h-5 text-primary transition-transform duration-200 shrink-0 ml-4',
 iconOpen:'rotate-180 text-primary',
 content:'mt-4 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-border pt-4',
 strokeWidth: 1.75
 },
'4': {
 root:'py-20 bg-background border-b-2 border-foreground transition-colors duration-200',
 container:'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
 header:'text-center mb-16',
 title:'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground mb-4',
 description:'text-base md:text-lg text-muted-foreground font-medium',
 accordionList:'space-y-4',
 item:'border-2 border-foreground p-5 transition-all duration-150 bg-card shadow-[4px_4px_0_var(--color-foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-foreground)] cursor-pointer',
 itemActive:'bg-card border-2 border-foreground shadow-[6px_6px_0_var(--color-foreground)] border-l-8 border-l-primary',
 trigger:'flex justify-between items-center w-full text-left font-bold text-foreground text-lg',
 icon:'w-6 h-6 text-foreground transition-transform duration-200 shrink-0 ml-4',
 iconOpen:'rotate-45 text-primary',
 content:'mt-3 text-muted-foreground leading-relaxed text-sm md:text-base border-t-2 border-foreground/10 dark:border-foreground/10 pt-3 font-normal',
 strokeWidth: 2.5
 }
}
export default defaultStyles
