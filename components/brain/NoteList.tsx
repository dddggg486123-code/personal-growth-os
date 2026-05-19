'use client';

import type { Note } from '@/lib/types';
import { Search, Plus, FileText, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function NoteList({ notes, selectedId, onSelect, onCreate, onDelete, searchQuery, onSearchChange }: NoteListProps) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
      <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={onCreate}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          <Plus size={14} /> 新建笔记
        </button>
        <div className="relative mt-2">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索笔记..."
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <FileText size={32} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>还没有笔记</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>开始记录你的思考吧</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => onSelect(note.id)}
              className="group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all"
              style={{
                backgroundColor: selectedId === note.id ? 'var(--accent-glow)' : 'transparent',
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {note.title || '无标题'}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('zh-CN') : ''}
                  </span>
                  {note.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-1 rounded" style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded transition-all hover:bg-red-500/10"
                style={{ color: 'var(--danger)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
