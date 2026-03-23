/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./landing.html",
    "./index.html"
    // add any other files with class="" or tw classes in JS
  ],
  // tailwind.config.js
safelist: [
  // Layout & visibility
  'hidden', 'flex', 'grid', 'grid-cols-1', 'grid-cols-3', 'lg:grid-cols-3', 'gap-6', 'gap-2', 'space-y-4',
  'flex-1', 'flex-col', 'items-center', 'justify-between', 'text-left', 'text-right', 'overflow-hidden',
  'overflow-y-auto', 'min-h-[350px]', 'h-[300px]', 'h-full', 'max-w-4xl', 'mx-auto',

  // Spacing & sizing
  'p-6', 'p-4', 'p-2', 'px-8', 'py-2', 'mb-4', 'mb-6', 'mt-4', 'mt-6', 'mt-2', 'mt-20', 'space-y-1',
  'w-full', 'w-24',

  // Typography
  'text-5xl', 'text-4xl', 'text-2xl', 'text-xl', 'text-lg', 'text-sm', 'text-xs', 'text-[10px]', 'text-[9px]',
  'font-black', 'font-bold', 'uppercase', 'italic', 'tracking-widest', 'tracking-tighter',
  'opacity-40', 'opacity-50', 'opacity-30',

  // Colors & borders
  'border-l-4', 'border-2', 'border-slate-800', 'border-slate-700', 'border-red-500', 'border-red-900/30',
  'border-blue-500', 'border-purple-500', '#4ade80', 'border-[#4ade80]', 'border-red-500',
  'bg-slate-900', 'bg-slate-900/80', 'bg-red-950/10', 'bg-red-900/30', 'bg-green-900/30',
  'text-[#4ade80]', 'text-red-400', 'text-green-400', 'text-yellow-400', 'text-yellow-300',
  'text-slate-200', 'text-slate-400', 'text-slate-500',

  // States & effects
  'hover:bg-slate-900/50', 'hover:text-red-500', 'animate-pulse',

  // Components & specials
  'glass', 'neon-border', 'risk-heatmap', 'bg-white/20', 'bg-transparent', 'border-none',
  'rounded', 'rounded-xl', 'inline-block',

  // Table / rows
  'border-b', 'border-b border-slate-800', 'hover:bg-slate-900/50', 'transition-colors',

  // Chat specific
  'text-right', 'user-msg', 'text-left', 'travis-msg', 'font-black', 'text-[10px]', 'mt-1',

  // Modal / overlays
  'bg-[#4ade80]', 'text-black', 'px-8', 'rounded', 'uppercase',
],
  theme: { extend: {} },
  plugins: [],
}