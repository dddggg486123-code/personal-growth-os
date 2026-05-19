'use client';

import type { Note } from '@/lib/types';
import { Edit3, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NoteViewerProps {
  note: Note | null;
  allNotes: Note[];
  onEdit: () => void;
  onNavigate: (title: string) => void;
}

export function NoteViewer({ note, allNotes, onEdit, onNavigate }: NoteViewerProps) {
  if (!note) return null;

  const resolveWikiLink = (title: string): string | null => {
    const found = allNotes.find((n) => n.title.toLowerCase() === title.toLowerCase());
    return found?.id || null;
  };

  const customRenderers = {
    a: ({ href, children }: any) => {
      if (href && href.startsWith('[[') && href.endsWith(']]')) {
        const title = href.slice(2, -2);
        const noteId = resolveWikiLink(title);
        return (
          <span
            onClick={() => noteId ? onNavigate(noteId) : null}
            className="cursor-pointer underline decoration-dotted"
            style={{ color: noteId ? 'var(--accent)' : 'var(--text-muted)' }}>
            {children || title}
          </span>
        );
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{children}</a>;
    },
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <button onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          <Edit3 size={12} /> 编辑
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{note.title}</h1>

        <div className="flex items-center gap-4 mb-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</span>
          {note.tags.length > 0 && (
            <div className="flex gap-1">
              {note.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 rounded-md" style={{ backgroundColor: 'var(--bg-card-hover)' }}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="prose prose-sm max-w-none" style={{ color: 'var(--text-primary)' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
