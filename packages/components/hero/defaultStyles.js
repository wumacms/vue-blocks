export const defaultStyles = {
'1': {
 root:'bg-background text-foreground antialiased relative bg-linear-to-b from-background to-muted/40 pt-16 pb-20 overflow-hidden transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto',
 title:'text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6',
 description:'text-lg text-muted-foreground mb-10',
 buttonGroup:'flex flex-wrap gap-4 justify-center',
 buttonPrimary:'bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium shadow-md transition',
 buttonSecondary:'bg-card border border-border hover:border-primary text-muted-foreground px-6 py-3 rounded-full font-medium shadow-sm transition',
 mediaWrapper:'mt-16 max-w-5xl mx-auto',
 imageBox:'rounded-xl shadow-2xl border border-border overflow-hidden',
 image:'w-full h-auto object-cover'
 },
'2': {
 root:'bg-primary/10 border-b-4 border-foreground relative overflow-hidden pt-16 pb-20 transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto',
 title:'text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6 leading-[1.1]',
 description:'text-lg text-foreground/80 mb-10 font-medium',
 buttonGroup:'flex flex-wrap gap-4 justify-center',
 buttonPrimary:'px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full border-4 border-foreground shadow-[6px_6px_0_var(--color-foreground)] hover:shadow-[2px_2px_0_var(--color-foreground)] transition',
 buttonSecondary:'px-8 py-4 bg-card text-foreground font-bold rounded-full border-4 border-foreground shadow-[6px_6px_0_var(--color-foreground)] hover:shadow-[2px_2px_0_var(--color-foreground)] transition',
 mediaWrapper:'mt-16 max-w-5xl mx-auto',
 imageBox:'bg-primary w-full h-80 md:h-96 rounded-3xl overflow-hidden border-4 border-foreground shadow-[16px_16px_0_var(--color-foreground)]',
 image:'w-full h-full object-cover opacity-90'
 },
'3': {
 root:'bg-background text-foreground antialiased relative border-b border-border pt-16 pb-20 overflow-hidden transition-colors duration-300',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
 contentWrapper:'text-center max-w-3xl mx-auto',
 title:'font-serif text-5xl md:text-6xl font-medium tracking-[-1.5px] leading-[1.05] text-foreground mb-6',
 description:'text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed',
 buttonGroup:'flex flex-wrap gap-4 justify-center items-center',
 buttonPrimary:'inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-6 py-3 rounded-md transition-colors shadow-xs',
 buttonSecondary:'inline-flex items-center justify-center gap-2 border border-border bg-card hover:bg-muted text-foreground text-sm font-medium px-6 py-3 rounded-md transition-colors',
 mediaWrapper:'mt-16 max-w-5xl mx-auto',
 imageBox:'rounded-xl overflow-hidden border border-border shadow-xs transition-colors',
 image:'w-full h-auto object-cover'
 },
'4': {
 root:'bg-background text-foreground antialiased relative border-b-2 border-foreground pt-16 pb-20 overflow-hidden bg-[linear-gradient(to_right,var(--color-foreground)/0.08_1px,transparent_1px),linear-gradient(to_bottom,var(--color-foreground)/0.08_1px,transparent_1px)] bg-[size:40px_40px] transition-colors duration-200',
 container:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
 contentWrapper:'text-center max-w-3xl mx-auto',
 title:'text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-foreground mb-6 leading-[1.05] [text-shadow:3px_3px_0_var(--color-primary),4px_4px_0_var(--color-foreground)]',
 description:'text-base md:text-lg text-foreground mb-10 max-w-2xl mx-auto font-medium bg-card border-2 border-foreground p-4 shadow-[5px_5px_0_var(--color-foreground)] -rotate-1',
 buttonGroup:'flex flex-wrap gap-4 justify-center items-center',
 buttonPrimary:'inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-sm px-8 py-3.5 border-2 border-foreground shadow-[4px_4px_0_var(--color-foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-foreground)] transition-all cursor-pointer',
 buttonSecondary:'inline-flex items-center justify-center gap-2 bg-card hover:bg-muted text-foreground font-bold uppercase tracking-wider text-sm px-8 py-3.5 border-2 border-foreground shadow-[4px_4px_0_var(--color-foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-foreground)] transition-all cursor-pointer',
 mediaWrapper:'mt-16 max-w-5xl mx-auto',
 imageBox:'border-2 border-foreground shadow-[8px_8px_0_var(--color-foreground)] rotate-1 hover:rotate-0 transition-transform overflow-hidden bg-card',
 image:'w-full h-auto object-cover block grayscale-[15%] contrast-[1.1] hover:grayscale-0 transition-all'
 }
}
export default defaultStyles
