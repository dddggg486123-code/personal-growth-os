import { getDB } from './db';
import type { Note } from './types';

export async function getAllNotes(): Promise<Note[]> {
  const db = await getDB();
  const notes: Note[] = await db.getAll('notes');
  return notes.sort((a: Note, b: Note) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getNote(id: string): Promise<Note | undefined> {
  const db = await getDB();
  return db.get('notes', id);
}

export async function saveNote(note: Note): Promise<void> {
  const db = await getDB();
  note.updatedAt = new Date().toISOString();
  await db.put('notes', note);
}

export async function deleteNote(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('notes', id);
}

export async function searchNotes(query: string): Promise<Note[]> {
  const db = await getDB();
  const all: Note[] = await db.getAll('notes');
  const q = query.toLowerCase();
  return all
    .filter((n: Note) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t: string) => t.toLowerCase().includes(q)))
    .sort((a: Note, b: Note) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getNotesByTag(tag: string): Promise<Note[]> {
  const db = await getDB();
  const index = db.transaction('notes').store.index('tags');
  return index.getAll(tag);
}

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const db = await getDB();
  const all: Note[] = await db.getAll('notes');
  const tagMap = new Map<string, number>();
  for (const note of all) {
    for (const tag of note.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]: [string, number]) => ({ name, count }))
    .sort((a: { name: string; count: number }, b: { name: string; count: number }) => b.count - a.count);
}

export function extractWikiLinks(content: string): string[] {
  const regex = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

export function generateNoteId(): string {
  return 'note_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}
