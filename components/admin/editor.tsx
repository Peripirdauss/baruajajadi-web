'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Toggle } from '@/components/ui/toggle';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight,
  Code, Quote, Image as ImageIcon, Link as LinkIcon,
  Undo, Redo
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function BlogEditor({ content, onChange, placeholder }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your story...',
      }),
    ],
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[400px] w-full max-w-none text-foreground pb-20 px-8 py-8',
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div className="w-full border border-border rounded-[1.5rem] overflow-hidden bg-card/40 backdrop-blur-md transition-all focus-within:border-accent/40 focus-within:shadow-2xl focus-within:shadow-accent/5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-border bg-background/50 sticky top-0 z-10 backdrop-blur-3xl">
        <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
          <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('underline')} onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
          <Toggle size="sm" pressed={editor.isActive('heading', { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('heading', { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('heading', { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
          <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
          <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
          <Toggle size="sm" pressed={editor.isActive('codeBlock')} onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}>
            <Code className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('blockquote')} onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
          <Toggle size="sm" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('link')} onClick={setLink}>
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center gap-1 border-border/50">
          <Toggle size="sm" onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-background/20 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
        <EditorContent editor={editor} />
      </div>

      <div className="p-3 border-t border-border bg-background/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex justify-between items-center">
        <span>Rich Text Command Logic Active</span>
        <span>HTML Powered Output</span>
      </div>
    </div>
  );
}
