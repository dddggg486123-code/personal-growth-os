import { openDB, type IDBPDatabase } from 'idb';
import type { DailyLog, UserProfile, Note } from './types';

const DB_NAME = 'growth-os';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase | null = null;

export async function getDB(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('logs')) {
        db.createObjectStore('logs', { keyPath: 'date' });
      }
      if (!db.objectStoreNames.contains('profile')) {
        db.createObjectStore('profile', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('notes')) {
        const notesStore = db.createObjectStore('notes', { keyPath: 'id' });
        notesStore.createIndex('updatedAt', 'updatedAt');
        notesStore.createIndex('tags', 'tags', { multiEntry: true });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    },
  });

  return dbInstance;
}

// Profile operations
export async function loadProfile(): Promise<UserProfile | null> {
  const db = await getDB();
  const record = await db.get('profile', 'main');
  return record?.data || null;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  const db = await getDB();
  await db.put('profile', { id: 'main', data: profile });
}

// Logs operations
export async function loadLogs(): Promise<Record<string, DailyLog>> {
  const db = await getDB();
  const all = await db.getAll('logs');
  const logs: Record<string, DailyLog> = {};
  for (const item of all) {
    logs[item.date] = item.data || item;
  }
  return logs;
}

export async function saveLog(date: string, log: DailyLog): Promise<void> {
  const db = await getDB();
  await db.put('logs', { ...log, date });
}

export async function loadAllLogsArray(): Promise<DailyLog[]> {
  const db = await getDB();
  const all = await db.getAll('logs');
  return all.map((item: any) => (item.data ? { date: item.date, ...item.data } : item));
}

// Legacy localStorage migration
export async function migrateFromLocalStorage(): Promise<boolean> {
  try {
    const raw = localStorage.getItem('personal-growth-os');
    if (!raw) return false;

    const data = JSON.parse(raw);
    const db = await getDB();

    if (data.state?.userProfile) {
      await db.put('profile', { id: 'main', data: data.state.userProfile });
    }
    if (data.state?.logs) {
      const logs = data.state.logs;
      for (const date of Object.keys(logs)) {
        await db.put('logs', { date, ...logs[date] });
      }
    }

    localStorage.setItem('personal-growth-os-migrated', 'true');
    return true;
  } catch {
    return false;
  }
}

export async function clearAllData(): Promise<void> {
  const db = await getDB();
  await db.clear('logs');
  await db.clear('profile');
  await db.clear('notes');
  await db.clear('settings');
  localStorage.removeItem('personal-growth-os');
  localStorage.removeItem('personal-growth-os-ui');
  localStorage.removeItem('personal-growth-os-migrated');
  window.location.reload();
}

// Export all data as JSON
export async function exportAllData(): Promise<string> {
  const db = await getDB();
  const profile = await db.get('profile', 'main');
  const logs = await db.getAll('logs');
  const notes = await db.getAll('notes');

  return JSON.stringify({
    version: 2,
    exportedAt: new Date().toISOString(),
    profile: profile?.data || null,
    logs: logs.map((l: any) => (l.data ? { date: l.date, ...l.data } : l)),
    notes,
  }, null, 2);
}

// Import data from JSON
export async function importAllData(json: string): Promise<boolean> {
  try {
    const data = JSON.parse(json);
    const db = await getDB();

    if (data.profile) {
      await db.put('profile', { id: 'main', data: data.profile });
    }
    if (data.logs) {
      for (const log of data.logs) {
        const date = log.date;
        const { date: _d, ...rest } = log;
        await db.put('logs', { date, ...rest });
      }
    }
    if (data.notes) {
      for (const note of data.notes) {
        await db.put('notes', note);
      }
    }

    window.location.reload();
    return true;
  } catch {
    return false;
  }
}
