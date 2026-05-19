'use client';

import { NoteList } from '@/components/brain/NoteList';
import { NoteEditor } from '@/components/brain/NoteEditor';
import { NoteViewer } from '@/components/brain/NoteViewer';
import { getAllNotes, saveNote, deleteNote, searchNotes, generateNoteId } from '@/lib/notes-db';
import type { Note } from '@/lib/types';
import { useEffect, useState, useCallback } from 'react';

export default function BrainPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'view'>('edit');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const all = searchQuery ? await searchNotes(searchQuery) : await getAllNotes();
    setNotes(all);
  }, [searchQuery]);

  useEffect(() => {
    refresh().then(() => setLoading(false));
  }, [refresh]);

  useEffect(() => {
    if (searchQuery) {
      searchNotes(searchQuery).then(setNotes);
    } else {
      getAllNotes().then(setNotes);
    }
  }, [searchQuery]);

  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  const handleCreate = () => {
    const newNote: Note = {
      id: generateNoteId(),
      title: '',
      content: '',
      tags: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
    setViewMode('edit');
  };

  const handleSave = async (note: Note) => {
    await saveNote(note);
    await refresh();
    setViewMode('view');
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    if (selectedId === id) setSelectedId(null);
    await refresh();
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setViewMode('view');
  };

  const handleNavigate = (id: string) => {
    setSelectedId(id);
    setViewMode('view');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center h-64" style={{ color: 'var(--text-muted)' }}>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)', height: 'calc(100vh - 180px)' }}>
        <div className="w-72 lg:w-80 flex-shrink-0 border-r" style={{ borderColor: 'var(--border)' }}>
          <NoteList
            notes={notes}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          {viewMode === 'edit' ? (
            <NoteEditor note={selectedNote} onSave={handleSave} onView={() => setViewMode('view')} />
          ) : (
            <NoteViewer
              note={selectedNote}
              allNotes={notes}
              onEdit={() => setViewMode('edit')}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
