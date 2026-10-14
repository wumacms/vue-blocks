export const defaultStyles = {
'1': {
 root:'py-20 bg-card text-card-foreground transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-4xl font-bold text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 mediaWrapper:'max-w-5xl mx-auto',
 imageBox:'rounded-2xl shadow-2xl overflow-hidden border border-border',
 image:'w-full h-auto object-cover'
 },
'2': {
 root:'py-20 bg-primary/10 border-b-4 border-foreground transition-colors duration-300 relative overflow-hidden',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight',
 description:'text-lg text-foreground/80 font-semibold',
 mediaWrapper:'max-w-5xl mx-auto',
 imageBox:'bg-primary rounded-3xl overflow-hidden border-4 border-foreground shadow-[16px_16px_0_var(--color-foreground)]',
 image:'w-full h-auto object-cover'
 },
'3': {
 root:'py-20 bg-background transition-colors duration-300 border-b border-border',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto mb-16',
 title:'font-serif text-3xl md:text-5xl font-medium tracking-[-0.5px] text-foreground mb-4',
 description:'text-lg text-muted-foreground',
 mediaWrapper:'max-w-5xl mx-auto',
 imageBox:'rounded-xl overflow-hidden border border-border shadow-xs',
 image:'w-full h-auto object-cover'
 },
'4': {
 root:'py-20 bg-background border-b-2 border-foreground transition-colors duration-200',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto mb-16',
 title:'text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground mb-4',
 description:'text-base md:text-lg text-muted-foreground font-medium',
 mediaWrapper:'max-w-5xl mx-auto',
 imageBox:'border-2 border-foreground shadow-[8px_8px_0_var(--color-foreground)] rotate-1 hover:rotate-0 transition-transform overflow-hidden bg-card',
 image:'w-full h-auto object-cover block grayscale-[15%] contrast-[1.1] hover:grayscale-0 transition-all'
 }
}
export default defaultStyles
