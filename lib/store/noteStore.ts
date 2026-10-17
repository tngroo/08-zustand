
import {create} from 'zustand'
import { CreateNoteParams } from '../api';
import { persist } from 'zustand/middleware';


const initialDraft : CreateNoteParams = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
    draft: CreateNoteParams, 
    setDraft :(postNoteData:CreateNoteParams) => void
    clearDraft: () =>void
}


export const useNoteDraft = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: {...initialDraft},
            setDraft: (postNoteData) => {
                set({draft: postNoteData})
            },
            clearDraft: () => {
                set({ draft: {...initialDraft} })
            },
        }),
        { name: 'note-draft-storage',
            partialize: (state) =>({draft: state.draft})
         },
    ),
)