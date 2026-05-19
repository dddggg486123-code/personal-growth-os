'use client';

import type { Note } from '@/lib/types';
import { Save, Eye, Edit3, Tags } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onView: () => void;
}

export function NoteEditor({ note, onSave, onView }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [note?.id]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
        <div className="text-center">
          <Edit3 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-sm">选择或创建一篇笔记</p>
          <p className="text-xs mt-1">支持 Markdown 语法和 [[双向链接]]</p>
        </div>
      </div>
    );
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!note) return;
    onSave({ ...note, title, content, tags });
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <button onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          <Save size={12} /> 保存
        </button>
        <button onClick={onView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          <Eye size={12} /> 预览
        </button>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="笔记标题..."
          className="w-full text-lg font-bold bg-transparent border-none outline-none"
          style={{ color: 'var(--text-primary)' }} />

        <div className="flex flex-wrap items-center gap-1">
          <Tags size={12} style={{ color: 'var(--text-muted)' }} />
          {tags.map((tag) => (
            <span key={tag}
              onClick={() => handleRemoveTag(tag)}
              className="text-xs px-2 py-0.5 rounded-md cursor-pointer transition-all"
              style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)' }}>
              {tag} ×
            </span>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="添加标签..."
            className="text-xs px-2 py-1 bg-transparent border-none outline-none flex-1 min-w-[80px]"
            style={{ color: 'var(--text-muted)' }} />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="开始用 Markdown 书写...
支持 [[双向链接]] 语法

# 标题
- 列表
**粗体** *斜体*"
          className="flex-1 w-full bg-transparent border-none outline-none resize-none text-sm leading-relaxed font-mono"
          style={{ color: 'var(--text-primary)', minHeight: '300px' }} />
      </div>

      <div className="p-2 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        支持 Markdown · 使用 [[笔记名]] 创建双向链接
      </div>
    </div>
  );
}
