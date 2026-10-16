import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'
import type { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Create Note',
  description: 'This page allow you to create new notes',
  openGraph : {
     title: 'Create Note',
    description: 'This page allow you to create new notes',
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 300,
        height: 300,
      alt: 'NoteHub',      
    }
    ]
  }
}

const CreateNote  = () => {
  return (
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
    <NoteForm />
  </div>
</main>

  )
}

export default CreateNote 

