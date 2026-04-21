import {
  PackageOpen, Target, PenLine, Star, Flame, Trophy, BookMarked, Layers,
  BookOpen, CalendarDays, Archive, SmilePlus,
  Shield, Zap, Crown, Grid2x2,
  CircleCheck, ListChecks, ClipboardList, CalendarCheck2,
  StickyNote, Lightbulb, Tag,
  Gem, Sparkles, Diamond,
} from 'lucide-react';
import type { Badge } from './types';

function maxConsecutiveDays(dates: string[]): number {
  const sorted = [...new Set(dates)].sort();
  if (sorted.length === 0) return 0;
  let max = 1, curr = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff =
      (new Date(sorted[i] + 'T12:00:00').getTime() -
        new Date(sorted[i - 1] + 'T12:00:00').getTime()) /
      86400000;
    if (diff === 1) { curr++; if (curr > max) max = curr; }
    else curr = 1;
  }
  return max;
}

export const BADGES: Badge[] = [
  // ── Lernen ────────────────────────────────────────────────────────────────
  {
    id: 'first_set',
    name: 'Erstes Set',
    description: 'Dein erstes Kartenset erstellt',
    icon: PackageOpen,
    color: 'var(--accent)',
    getProgress: (_user, sets) => ({ current: Math.min(sets.length, 1), max: 1 }),
  },
  {
    id: 'first_quiz',
    name: 'Erster Quiz',
    description: 'Dein erstes Quiz abgeschlossen',
    icon: Target,
    color: 'var(--accent)',
    getProgress: (user) => ({ current: user.earnedBadges.includes('first_quiz') ? 1 : 0, max: 1 }),
  },
  {
    id: 'first_test',
    name: 'Erster Test',
    description: 'Deinen ersten Test abgeschlossen',
    icon: PenLine,
    color: 'var(--accent)',
    getProgress: (user) => ({ current: user.earnedBadges.includes('first_test') ? 1 : 0, max: 1 }),
  },
  {
    id: 'perfect_score',
    name: 'Perfekt!',
    description: '100% in einem Quiz oder Test erreicht',
    icon: Star,
    color: 'var(--accent)',
    getProgress: (user) => ({ current: user.earnedBadges.includes('perfect_score') ? 1 : 0, max: 1 }),
  },
  {
    id: 'streak_3',
    name: '3-Tage Streak',
    description: '3 Tage hintereinander gelernt',
    icon: Flame,
    color: 'var(--accent)',
    getProgress: (user) => ({ current: Math.min(user.streak, 3), max: 3 }),
  },
  {
    id: 'streak_7',
    name: '7-Tage Streak',
    description: '7 Tage hintereinander gelernt',
    icon: Trophy,
    color: 'var(--accent)',
    getProgress: (user) => ({ current: Math.min(user.streak, 7), max: 7 }),
  },
  {
    id: 'five_sets',
    name: 'Fleißig',
    description: '5 Kartensets erstellt',
    icon: BookMarked,
    color: 'var(--accent)',
    getProgress: (_user, sets) => ({ current: Math.min(sets.length, 5), max: 5 }),
  },
  {
    id: 'fifty_cards',
    name: 'Kartenmeister',
    description: '50 Karten insgesamt gelernt',
    icon: Layers,
    color: 'var(--accent)',
    getProgress: (user) => ({ current: Math.min(user.totalCardsStudied, 50), max: 50 }),
  },

  // ── Tagebuch ──────────────────────────────────────────────────────────────
  {
    id: 'diary_first',
    name: 'Tagebuchschreiber',
    description: 'Deinen ersten Tagebucheintrag geschrieben',
    icon: BookOpen,
    color: '#378ADD',
    getProgress: (_user, _sets, extra) => ({
      current: Math.min(extra?.diaryEntries.length ?? 0, 1),
      max: 1,
    }),
  },
  {
    id: 'diary_streak_7',
    name: 'Reflektiert',
    description: '7 Tage in Folge Tagebuch geschrieben',
    icon: CalendarDays,
    color: '#378ADD',
    getProgress: (_user, _sets, extra) => {
      const dates = (extra?.diaryEntries ?? []).map((e) => e.date);
      return { current: Math.min(maxConsecutiveDays(dates), 7), max: 7 };
    },
  },
  {
    id: 'diary_30',
    name: 'Chronist',
    description: '30 Tagebucheinträge insgesamt geschrieben',
    icon: Archive,
    color: '#378ADD',
    getProgress: (_user, _sets, extra) => ({
      current: Math.min(extra?.diaryEntries.length ?? 0, 30),
      max: 30,
    }),
  },
  {
    id: 'diary_mood_5',
    name: 'Gute Laune',
    description: '5-mal Stimmung 5/5 eingetragen',
    icon: SmilePlus,
    color: '#378ADD',
    getProgress: (_user, _sets, extra) => ({
      current: Math.min((extra?.diaryEntries ?? []).filter((e) => e.mood === 5).length, 5),
      max: 5,
    }),
  },

  // ── Habits ────────────────────────────────────────────────────────────────
  {
    id: 'habit_first',
    name: 'Gewohnheitstier',
    description: 'Deine erste Gewohnheit erstellt',
    icon: Zap,
    color: '#EF9F27',
    getProgress: (_user, _sets, extra) => ({
      current: Math.min(extra?.habits.length ?? 0, 1),
      max: 1,
    }),
  },
  {
    id: 'habit_streak_7',
    name: 'Eiserne Disziplin',
    description: 'Eine Gewohnheit 7 Tage in Folge erledigt',
    icon: Shield,
    color: '#EF9F27',
    getProgress: (_user, _sets, extra) => {
      const best = Math.max(0, ...(extra?.habits ?? []).map((h) => h.streak));
      return { current: Math.min(best, 7), max: 7 };
    },
  },
  {
    id: 'habit_streak_30',
    name: 'Unaufhaltbar',
    description: 'Eine Gewohnheit 30 Tage in Folge erledigt',
    icon: Crown,
    color: '#EF9F27',
    getProgress: (_user, _sets, extra) => {
      const best = Math.max(0, ...(extra?.habits ?? []).map((h) => h.streak));
      return { current: Math.min(best, 30), max: 30 };
    },
  },
  {
    id: 'habit_allrounder',
    name: 'Allrounder',
    description: 'Alle Habits an einem Tag erledigt',
    icon: Grid2x2,
    color: '#EF9F27',
    getProgress: (user) => ({
      current: user.earnedBadges.includes('habit_allrounder') ? 1 : 0,
      max: 1,
    }),
  },

  // ── Tasks ─────────────────────────────────────────────────────────────────
  {
    id: 'task_first',
    name: 'Erledigungsmaschine',
    description: 'Deinen ersten Task erledigt',
    icon: CircleCheck,
    color: '#1D9E75',
    getProgress: (user) => ({
      current: user.earnedBadges.includes('task_first') ? 1 : 0,
      max: 1,
    }),
  },
  {
    id: 'task_10',
    name: 'Produktiv',
    description: '10 Tasks insgesamt erledigt',
    icon: ListChecks,
    color: '#1D9E75',
    getProgress: (_user, _sets, extra) => {
      const tasks = extra?.tasks ?? [];
      const done = tasks.filter((t) => !t.recurring && t.completed).length
        + tasks.reduce((s, t) => s + t.completedDates.length, 0);
      return { current: Math.min(done, 10), max: 10 };
    },
  },
  {
    id: 'task_50',
    name: 'Fleissig',
    description: '50 Tasks insgesamt erledigt',
    icon: ClipboardList,
    color: '#1D9E75',
    getProgress: (_user, _sets, extra) => {
      const tasks = extra?.tasks ?? [];
      const done = tasks.filter((t) => !t.recurring && t.completed).length
        + tasks.reduce((s, t) => s + t.completedDates.length, 0);
      return { current: Math.min(done, 50), max: 50 };
    },
  },
  {
    id: 'task_perfect_day',
    name: 'Perfekter Tag',
    description: 'Alle Tasks eines Tages erledigt',
    icon: CalendarCheck2,
    color: '#1D9E75',
    getProgress: (user) => ({
      current: user.earnedBadges.includes('task_perfect_day') ? 1 : 0,
      max: 1,
    }),
  },

  // ── Notizen ───────────────────────────────────────────────────────────────
  {
    id: 'note_first',
    name: 'Notiznehmer',
    description: 'Deine erste Notiz erstellt',
    icon: StickyNote,
    color: 'var(--accent)',
    getProgress: (_user, _sets, extra) => ({
      current: Math.min(extra?.notes.length ?? 0, 1),
      max: 1,
    }),
  },
  {
    id: 'note_10',
    name: 'Ideensammler',
    description: '10 Notizen erstellt',
    icon: Lightbulb,
    color: 'var(--accent)',
    getProgress: (_user, _sets, extra) => ({
      current: Math.min(extra?.notes.length ?? 0, 10),
      max: 10,
    }),
  },
  {
    id: 'note_tagged',
    name: 'Organisiert',
    description: 'Erste Notiz mit einem Tag versehen',
    icon: Tag,
    color: 'var(--accent)',
    getProgress: (user) => ({
      current: user.earnedBadges.includes('note_tagged') ? 1 : 0,
      max: 1,
    }),
  },

  // ── Kristalle ─────────────────────────────────────────────────────────────
  {
    id: 'crystals_500',
    name: 'Sparsam',
    description: '500 Kristalle gesammelt',
    icon: Gem,
    color: '#378ADD',
    getProgress: (user) => ({ current: Math.min(user.crystals ?? 0, 500), max: 500 }),
  },
  {
    id: 'crystals_1000',
    name: 'Reich',
    description: '1000 Kristalle gesammelt',
    icon: Sparkles,
    color: '#378ADD',
    getProgress: (user) => ({ current: Math.min(user.crystals ?? 0, 1000), max: 1000 }),
  },
  {
    id: 'crystals_5000',
    name: 'Kristallkönig',
    description: '5000 Kristalle gesammelt',
    icon: Diamond,
    color: '#378ADD',
    getProgress: (user) => ({ current: Math.min(user.crystals ?? 0, 5000), max: 5000 }),
  },
];
