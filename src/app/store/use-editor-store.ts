import { create } from 'zustand';
import { type Editor } from '@tiptap/react';

/*
  creates a global store using Zustand to hold and update a TipTap editor instance, 
  so that any component in the app can access or update it.
*/

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorState>((set) =>({
  editor: null,
  setEditor: (editor) => set({editor})
}))