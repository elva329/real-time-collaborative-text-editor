'use client'

import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { cn } from '../../../lib/utils';
import { useEditorStore } from '../../store/use-editor-store';
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu';
import { type Level } from '@tiptap/extension-heading'

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal text'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='
          h7 min-w-7 shrink-0 
          flex items-center justify-center
          rounded-sm hover:bg-neutral-200/80 px-1.5 
          overflow-hidden 
          text-sm'>
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({ label, value, fontSize }) => {
          return (
            <button
              key={value}
              className={cn('flex items-center gap-x-2 py-1 rounde-sm hover:bg-neutral-200/80',
                (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value })
              )}
              style={{ fontSize }}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run()
                } else {
                  editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='
          h7 w-[120px] shrink-0 
          flex items-center justify-between 
          rounded-sm hover:bg-neutral-200/80 px-1.5 
          overflow-hidden 
          text-sm'>
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map((font) => {
          return (
            <button
              key={font.value}
              className={cn('flex items-center gap-x-2 py-1 rounde-sm hover:bg-neutral-200/80',
                editor?.getAttributes('textStyle').fontFamily == font.value && 'bg-neutral-200/80'
              )}
              style={{ fontFamily: font.value }}
              onClick={() => editor?.chain().focus().setFontFamily(font.value).run()}
            >
              <span className='text-sm'>{font.label}</span>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className='size-4' />
    </button>
  )
}

const Toolbar = () => {
  const { editor } = useEditorStore();

  const [_, setTrigger] = useState(0) // trigger is not used, just forces rerender

  /*
    Add state to trigger re-renders on editor updates:
    This ensures that every time the content or selection updates, 
    the component re-renders, and things like editor.isActive('bold') are freshly evaluated.
    So that we can see the isActive and not active UI display
  */

  useEffect(() => {
    if (!editor) return

    const update = () => setTrigger((prev) => prev + 1)

    editor.on('update', update)
    editor.on('selectionUpdate', update)

    return () => {
      editor.off('update', update)
      editor.off('selectionUpdate', update)
    }
  }, [editor])

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
      [
        {
          label: 'Undo',
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run()
        },
        {
          label: 'Redo',
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run()
        },
        {
          label: 'Print',
          icon: PrinterIcon,
          onClick: () => window.print()
        },
        {
          label: 'Spell Check',
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute('spellcheck');
            editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false')
          }
        },
      ],
      [
        {
          label: 'Bold',
          icon: BoldIcon,
          isActive: editor?.isActive('bold'),
          onClick: () => editor?.chain().focus().toggleBold().run()
        },
        {
          label: 'Italic',
          icon: ItalicIcon,
          isActive: editor?.isActive('italic'),
          onClick: () => editor?.chain().focus().toggleItalic().run()
        },
        {
          label: 'Underline',
          icon: UnderlineIcon,
          isActive: editor?.isActive('underline'),
          onClick: () => editor?.chain().focus().toggleUnderline().run()
        },
      ], [
        {
          label: 'Comment',
          icon: MessageSquarePlusIcon,
          isActive: false,
          onClick: () => console.log('TODO: Comment')
        },
        {
          label: 'List Todo',
          icon: ListTodoIcon,
          isActive: editor?.isActive('taskList'),
          onClick: () => editor?.chain().focus().toggleTaskList().run()
        },
        {
          label: 'Remove Formatting',
          icon: RemoveFormattingIcon,
          onClick: () => editor?.chain().focus().unsetAllMarks().run()
        }
      ]
    ]

  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => {
        return <ToolbarButton key={item.label} {...item} />
      })}
      <Separator orientation='vertical' className='bg-neutral-300' />
      <FontFamilyButton />

      <Separator orientation='vertical' className='bg-neutral-300' />
      <HeadingLevelButton />

      <Separator orientation='vertical' className='bg-neutral-300' />

      <Separator orientation='vertical' className='bg-neutral-300' />
      {sections[1].map((item) => {
        return <ToolbarButton key={item.label} {...item} />
      })}
      <Separator orientation='vertical' className='bg-neutral-300' />
      {sections[2].map((item) => {
        return <ToolbarButton key={item.label} {...item} />
      })}
    </div>
  )
}

export default Toolbar;