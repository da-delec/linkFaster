'use client'

import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => <div>Loading GitHub activity...</div>
});

interface GithubCalendarProps {
  username: string;
  colorTheme?: string;
}

export default function GithubCalendarComponent({username, colorTheme = 'default'}: GithubCalendarProps) {
  const getTheme = (theme: string) => {
    switch (theme) {
      case 'midnight':
        return {
            light: ['rgba(224,242,254,0.8)', 'rgba(186,230,253,0.9)', 'rgba(125,211,252,1)', 'rgba(56,189,248,1)', 'rgba(14,165,233,1)'],
            dark: ['rgba(224,242,254,0.8)', 'rgba(186,230,253,0.9)', 'rgba(125,211,252,1)', 'rgba(56,189,248,1)', 'rgba(14,165,233,1)'],
        };
      case 'glass':
      case 'glass-aurora':
        return {
          light: ['rgba(255,255,255,0.1)', 'rgba(147,197,253,0.4)', 'rgba(96,165,250,0.6)', 'rgba(59,130,246,0.8)', 'rgba(37,99,235,1)'],
          dark: ['rgba(255,255,255,0.1)', 'rgba(147,197,253,0.4)', 'rgba(96,165,250,0.6)', 'rgba(59,130,246,0.8)', 'rgba(37,99,235,1)'],
        };
      case 'glass-nebula':
        return {
          light: ['rgba(255,255,255,0.1)', 'rgba(221,214,254,0.4)', 'rgba(167,139,250,0.6)', 'rgba(139,92,246,0.8)', 'rgba(109,40,217,1)'],
          dark: ['rgba(255,255,255,0.1)', 'rgba(221,214,254,0.4)', 'rgba(167,139,250,0.6)', 'rgba(139,92,246,0.8)', 'rgba(109,40,217,1)'],
        };
      case 'glass-cosmic':
        return {
          light: ['rgba(255,255,255,0.1)', 'rgba(245,208,254,0.4)', 'rgba(240,171,252,0.6)', 'rgba(217,70,239,0.8)', 'rgba(168,85,247,1)'],
          dark: ['rgba(255,255,255,0.1)', 'rgba(245,208,254,0.4)', 'rgba(240,171,252,0.6)', 'rgba(217,70,239,0.8)', 'rgba(168,85,247,1)'],
        };
      case 'prisme-dark':
        return {
          light: ['rgba(255,255,255,0.4)', 'rgba(167,243,208,0.4)', 'rgba(52,211,153,0.6)', 'rgba(16,185,129,0.8)', 'rgba(5,150,105,1)'],
          dark: ['rgba(255,255,255,0.4)', 'rgba(167,243,208,0.4)', 'rgba(52,211,153,0.6)', 'rgba(16,185,129,0.8)', 'rgba(5,150,105,1)'],
        };
      case 'prisme-grey':
        return {
          light: ['rgba(255,255,255,0.1)', 'rgba(254,215,170,0.4)', 'rgba(251,191,36,0.6)', 'rgba(245,158,11,0.8)', 'rgba(217,119,6,1)'],
          dark: ['rgba(255,255,255,0.1)', 'rgba(254,215,170,0.4)', 'rgba(251,191,36,0.6)', 'rgba(245,158,11,0.8)', 'rgba(217,119,6,1)'],
        };
      case 'emerald':
        return {
          light: ['#ebedf0', '#a7f3d0', '#34d399', '#10b981', '#047857'],
          dark: ['#161b22', '#064e3b', '#065f46', '#047857', '#10b981'],
        };
      case 'purple':
        return {
          light: ['#ebedf0', '#c4b5fd', '#8b5cf6', '#7c3aed', '#6d28d9'],
          dark: ['#161b22', '#581c87', '#6d28d9', '#7c3aed', '#8b5cf6'],
        };
      default:
        return {
          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        };
    }
  };

  const customTheme = getTheme(colorTheme);
  const isDarkTheme = ['midnight', 'glass', 'glass-aurora', 'glass-nebula', 'glass-cosmic', 'prisme-dark', 'prisme-grey'].includes(colorTheme);
  const textColor = isDarkTheme ? '#ffffff' : '#000000';

  return (
    <div className="p-4 mt-5 flex flex-col items-center justify-center">
      <h1 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
        GitHub Activity
      </h1>
      <div className="w-full overflow-x-auto p-4 rounded">
        <div className="min-w-fit">
          <GitHubCalendar 
            username={username} 
            theme={customTheme}
            colorScheme={isDarkTheme ? 'dark' : 'light'}
            blockSize={9}
            blockMargin={2}
            fontSize={7}
            showWeekdayLabels
            style={{
              color: textColor
            }}
            transformData={(contributions) => {
              console.log('Contributions data:', contributions);
              const totalContributions = contributions.reduce((total, day) => total + day.count, 0);
              console.log('Total contributions calculated:', totalContributions);
              return contributions;
            }}
          />
        </div>
      </div>
    </div>
  )
}