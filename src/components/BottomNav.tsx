import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CalendarDays, Repeat2, StickyNote, Grid2x2 } from 'lucide-react';
import { useStore } from '../store';

// Orange=Streak/Habits · Blue=Crystals/Shop · Green=Challenge/Done · Purple=XP/Level · Red=Error
const TABS = [
  { path: '/',             label: 'Dashboard', Icon: LayoutDashboard, color: '#7F77DD' },
  { path: '/lernen',       label: 'Lernen',    Icon: BookOpen,        color: '#7F77DD' },
  { path: '/planer',       label: 'Planer',    Icon: CalendarDays,    color: '#1D9E75' },
  { path: '/gewohnheiten', label: 'Habits',    Icon: Repeat2,         color: '#EF9F27' },
  { path: '/notizen',      label: 'Notizen',   Icon: StickyNote,      color: '#7F77DD' },
  { path: '/mehr',         label: 'Mehr',      Icon: Grid2x2,         color: '#7F77DD' },
] as const;

export default function BottomNav() {
  const location = useLocation();
  const darkMode = useStore((s) => s.darkMode);
  const inactiveColor = darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)';

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-card border-t app-border">
      <div className="max-w-4xl mx-auto flex items-stretch">
        {TABS.map(({ path, label, Icon, color }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              style={active ? { color } : { color: inactiveColor }}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
