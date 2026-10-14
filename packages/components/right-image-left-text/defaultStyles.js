export const defaultStyles = {
'1': {
 root:'py-20 bg-muted transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 grid:'grid md:grid-cols-2 gap-12 items-center',
 contentWrapper:'space-y-6',
 title:'text-3xl md:text-4xl font-bold text-foreground leading-tight',
 description:'text-lg text-muted-foreground leading-relaxed',
 tagList:'space-y-3 pt-2',
 tagItem:'flex items-center gap-3 text-foreground font-medium',
 tagIcon:'flex-shrink-0 w-5 h-5 text-primary bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold',
 mediaWrapper:'relative',
 imageBox:'rounded-2xl shadow-xl overflow-hidden border border-border',
 image:'w-full h-auto object-cover'
 },
'2': {
 root:'py-20 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 grid:'grid md:grid-cols-2 gap-12 lg:gap-16 items-center',
 contentWrapper:'space-y-6',
 title:'text-3xl md:text-5xl font-black text-foreground leading-tight tracking-tight',
 description:'text-lg text-foreground/80 font-semibold leading-relaxed',
 tagList:'space-y-3 pt-2',
 tagItem:'flex items-center gap-3 text-foreground font-bold',
    tagIcon: 'shrink-0 w-6 h-6 bg-primary text-primary-foreground border-2 border-foreground rounded-full flex items-center justify-center text-xs font-black shadow-[2px_2px_0_var(--color-foreground)]',
 mediaWrapper:'relative',
 imageBox:'bg-primary rounded-3xl overflow-hidden border-4 border-foreground shadow-[16px_16px_0_var(--color-foreground)]',
 image:'w-full h-auto object-cover'
 },
'3': {
 root:'py-20 bg-[var(--color-muted)] dark:bg-[var(--color-muted)] transition-colors duration-300 border-b border-border',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 grid:'grid md:grid-cols-2 gap-12 items-center',
 contentWrapper:'space-y-6',
 title:'font-serif text-3xl md:text-4xl font-semibold tracking-[-0.5px] text-foreground leading-tight',
 description:'text-lg text-muted-foreground leading-relaxed',
 tagList:'space-y-3 pt-2',
 tagItem:'flex items-center gap-3 text-muted-foreground font-medium',
 tagIcon:'shrink-0 w-5 h-5 text-primary flex items-center justify-center text-sm font-bold',
 mediaWrapper:'relative',
 imageBox:'rounded-xl overflow-hidden border border-border shadow-xs',
 image:'w-full h-auto object-cover'
 },
'4': {
 root:'py-20 bg-background border-b-2 border-foreground transition-colors duration-200',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 grid:'grid md:grid-cols-2 gap-12 items-center',
 contentWrapper:'space-y-6',
 title:'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground leading-tight',
 description:'text-base md:text-lg text-muted-foreground font-medium leading-relaxed',
 tagList:'space-y-3 pt-2',
 tagItem:'flex items-center gap-3 text-foreground font-bold',
 tagIcon:'shrink-0 w-6 h-6 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center text-xs font-bold shadow-[2px_2px_0_var(--color-foreground)]',
 mediaWrapper:'relative',
 imageBox:'border-2 border-foreground shadow-[8px_8px_0_var(--color-foreground)] rotate-1 hover:rotate-0 transition-transform overflow-hidden bg-card',
 image:'w-full h-auto object-cover block grayscale-[15%] contrast-[1.1] hover:grayscale-0 transition-all'
 }
}
export default defaultStyles
