  const getThemeColors = (theme: string) => {
    switch (theme) {
      // 3 thèmes principaux
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700',
          secondary: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
          accent: 'text-emerald-600 dark:text-emerald-400',
          gradient: 'from-emerald-400 to-emerald-600',
          background: 'from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800'
        }
      case 'blue':
        return {
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-400 to-blue-600',
          background: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
        }
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700',
          secondary: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-purple-400 to-purple-600',
          background: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800'
        }

      // Thèmes dark - sobre et classe avec bon contraste
      case 'midnight':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900',
          secondary: 'bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-slate-700 to-slate-900',
          background: 'from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950'
        }
      case 'obsidian':
        return {
          primary: 'bg-stone-800 hover:bg-stone-900',
          secondary: 'bg-stone-50 dark:bg-stone-900/80 border-stone-200 dark:border-stone-700',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-stone-700 to-stone-900',
          background: 'from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-950'
        }
      case 'void':
        return {
          primary: 'bg-zinc-800 hover:bg-zinc-900',
          secondary: 'bg-zinc-50 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700',
          accent: 'text-cyan-600 dark:text-cyan-400',
          gradient: 'from-zinc-700 to-zinc-900',
          background: 'from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950'
        }

      // Gradients créatifs - sobre avec slate 900, bleu marine foncé, violet
      case 'ocean':
        return {
          primary: 'bg-gradient-to-r from-slate-700 to-blue-800 hover:from-slate-800 hover:to-blue-900',
          secondary: 'bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-slate-700 to-blue-800',
          background: 'from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950'
        }
      case 'cosmic':
        return {
          primary: 'bg-gradient-to-r from-slate-700 to-purple-800 hover:from-slate-800 hover:to-purple-900',
          secondary: 'bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-slate-700 to-purple-800',
          background: 'from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950'
        }
      case 'forest':
        return {
          primary: 'bg-gradient-to-r from-slate-700 to-green-800 hover:from-slate-800 hover:to-green-900',
          secondary: 'bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700',
          accent: 'text-green-600 dark:text-green-400',
          gradient: 'from-slate-700 to-green-800',
          background: 'from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-950'
        }

      // Vrai glassmorphisme
      case 'glass-blue':
        return {
          primary: 'bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-xl border border-blue-300/50',
          secondary: 'bg-white/20 backdrop-blur-xl border border-white/30',
          accent: 'text-blue-700 dark:text-blue-300',
          gradient: 'from-blue-400/20 to-blue-600/20',
          background: 'from-blue-100/20 to-blue-200/20 dark:from-blue-900/20 dark:to-blue-800/20'
        }
      case 'glass-purple':
        return {
          primary: 'bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-xl border border-purple-300/50',
          secondary: 'bg-white/20 backdrop-blur-xl border border-white/30',
          accent: 'text-purple-700 dark:text-purple-300',
          gradient: 'from-purple-400/20 to-purple-600/20',
          background: 'from-purple-100/20 to-purple-200/20 dark:from-purple-900/20 dark:to-purple-800/20'
        }
      case 'glass-emerald':
        return {
          primary: 'bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-xl border border-emerald-300/50',
          secondary: 'bg-white/20 backdrop-blur-xl border border-white/30',
          accent: 'text-emerald-700 dark:text-emerald-300',
          gradient: 'from-emerald-400/20 to-emerald-600/20',
          background: 'from-emerald-100/20 to-emerald-200/20 dark:from-emerald-900/20 dark:to-emerald-800/20'
        }

      default:
        return {
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-400 to-blue-600',
          background: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
        }
    }
  }