// THEMES FINAUX - HARD CODÉS PROPREMENT

const THEMES = {
  // 3 THEMES PRINCIPAUX
  emerald: {
    primary: 'bg-emerald-600 hover:bg-emerald-700',
    secondary: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
    accent: 'text-emerald-600 dark:text-emerald-400',
    background: 'from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800'
  },
  blue: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
    accent: 'text-blue-600 dark:text-blue-400',
    background: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
  },
  purple: {
    primary: 'bg-purple-600 hover:bg-purple-700',
    secondary: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
    accent: 'text-purple-600 dark:text-purple-400',
    background: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800'
  },

  // THEMES SOMBRES - VRAIMENT SOMBRES
  midnight: {
    primary: 'bg-slate-700 hover:bg-slate-800',
    secondary: 'bg-slate-800/90 dark:bg-slate-900/90 border-slate-600 dark:border-slate-700',
    accent: 'text-blue-400 dark:text-blue-300',
    background: 'from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black',
    isDark: true
  },
  obsidian: {
    primary: 'bg-stone-700 hover:bg-stone-800',
    secondary: 'bg-stone-800/90 dark:bg-stone-900/90 border-stone-600 dark:border-stone-700',
    accent: 'text-purple-400 dark:text-purple-300',
    background: 'from-stone-800 to-stone-900 dark:from-stone-900 dark:to-black',
    isDark: true
  },
  void: {
    primary: 'bg-zinc-700 hover:bg-zinc-800',
    secondary: 'bg-zinc-800/90 dark:bg-zinc-900/90 border-zinc-600 dark:border-zinc-700',
    accent: 'text-cyan-400 dark:text-cyan-300',
    background: 'from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-black',
    isDark: true
  },

  // GRADIENTS SOBRES
  ocean: {
    primary: 'bg-gradient-to-r from-slate-700 to-blue-800 hover:from-slate-800 hover:to-blue-900',
    secondary: 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700',
    accent: 'text-blue-600 dark:text-blue-400',
    background: 'from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900'
  },
  cosmic: {
    primary: 'bg-gradient-to-r from-slate-700 to-purple-800 hover:from-slate-800 hover:to-purple-900',
    secondary: 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700',
    accent: 'text-purple-600 dark:text-purple-400',
    background: 'from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-900'
  },
  forest: {
    primary: 'bg-gradient-to-r from-slate-700 to-green-800 hover:from-slate-800 hover:to-green-900',
    secondary: 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700',
    accent: 'text-green-600 dark:text-green-400',
    background: 'from-slate-50 to-green-50 dark:from-slate-800 dark:to-green-900'
  },

  // GLASSMORPHISME
  'glass-blue': {
    primary: 'bg-blue-500/25 hover:bg-blue-500/35 backdrop-blur-xl border border-blue-300/50',
    secondary: 'bg-white/25 backdrop-blur-xl border border-white/40',
    accent: 'text-blue-700 dark:text-blue-200',
    background: 'from-blue-50/30 to-blue-100/30 dark:from-blue-900/30 dark:to-blue-800/30',
    isGlass: true
  },
  'glass-purple': {
    primary: 'bg-purple-500/25 hover:bg-purple-500/35 backdrop-blur-xl border border-purple-300/50',
    secondary: 'bg-white/25 backdrop-blur-xl border border-white/40',
    accent: 'text-purple-700 dark:text-purple-200',
    background: 'from-purple-50/30 to-purple-100/30 dark:from-purple-900/30 dark:to-purple-800/30',
    isGlass: true
  },
  'glass-emerald': {
    primary: 'bg-emerald-500/25 hover:bg-emerald-500/35 backdrop-blur-xl border border-emerald-300/50',
    secondary: 'bg-white/25 backdrop-blur-xl border border-white/40',
    accent: 'text-emerald-700 dark:text-emerald-200',
    background: 'from-emerald-50/30 to-emerald-100/30 dark:from-emerald-900/30 dark:to-emerald-800/30',
    isGlass: true
  }
}

export default THEMES;