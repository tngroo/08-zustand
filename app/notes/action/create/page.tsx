import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'
import type { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Create Note',
  description: 'New notes',
  openGraph : {
     title: 'Create Note',
    description: 'New notes',
    url: 'https://notehub.com/',
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

