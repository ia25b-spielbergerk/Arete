import { useEffect, useRef, useState } from 'react';
import { Bell, Trophy, Zap, Flame, Repeat2, BookOpen } from 'lucide-react';
import { useStore } from '../store';
import type { NotificationType } from '../types';

function formatTimestamp(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Gerade eben';
  if (mins < 60) return `vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
}

const TYPE_CONFIG: Record<NotificationType, { Icon: typeof Bell; color: string }> = {
  achievement:        { Icon: Trophy,   color: '#EF9F27' },
  level_up:          { Icon: Zap,      color: 'var(--accent)' },
  streak_warning:    { Icon: Flame,    color: '#E24B4A' },
  habit_reminder:    { Icon: Repeat2,  color: '#EF9F27' },
  challenge_reminder:{ Icon: BookOpen, color: 'var(--accent)' },
};

export default function NotificationBell() {
  const notifications = useStore((s) => s.notifications);
  const markAllNotificationsRead = useStore((s) => s.markAllNotificationsRead);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors app-hover cursor-pointer"
        style={{ color: 'var(--text-2)' }}
        title="Benachrichtigungen"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white font-bold"
            style={{ backgroundColor: '#E24B4A', fontSize: '9px' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 rounded-xl border shadow-lg overflow-hidden"
          style={{
            width: '320px',
            backgroundColor: 'var(--bg-page)',
            borderColor: 'var(--border)',
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="text-sm font-semibold app-text">Benachrichtigungen</span>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllNotificationsRead()}
                className="text-xs cursor-pointer transition-opacity hover:opacity-70"
                style={{ color: 'var(--accent)' }}
              >
                Alle als gelesen markieren
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <p className="text-xs text-center py-8" style={{ color: 'var(--text-2)' }}>
                Keine Benachrichtigungen
              </p>
            ) : (
              notifications.map((n) => {
                const { Icon, color } = TYPE_CONFIG[n.type];
                return (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: n.read ? 'transparent' : 'var(--accent-bg)',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold app-text">{n.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{n.text}</p>
                      <p className="text-[10px] mt-1" style={{ color: 'var(--text-2)' }}>
                        {formatTimestamp(n.timestamp)}
                      </p>
                    </div>
                    {!n.read && (
                      <div
                        className="w-2 h-2 rounded-full shrink-0 mt-2"
                        style={{ backgroundColor: '#E24B4A' }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
