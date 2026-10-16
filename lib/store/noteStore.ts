
import {create} from 'zustand'
import { CreateNoteParams } from '../api';
import { persist } from 'zustand/middleware';


const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
    note: Partial<CreateNoteParams>, 
    setDraft :(postNoteData:Partial<CreateNoteParams>) => void
    clearDraft: () =>void
}


export const useNoteDraft = create<NoteDraftStore>()(
    persist(
        (set) => ({
            note: initialDraft,
            setDraft: (postNoteData: Partial<CreateNoteParams>) => {
                set((prevState) => ({ note: { ...prevState.note, ...postNoteData } }))
            },
            clearDraft: () => {
                set({ note: initialDraft })
            },
        }),
        { name: 'note-draft-storage',
            partialize: (state) =>({note: state.note})
         },
    ),
)