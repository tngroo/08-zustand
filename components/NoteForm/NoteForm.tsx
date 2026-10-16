
'use client'
import * as Yup from 'yup';
import css from './NoteForm.module.css'
import { createNote } from "@/lib/api";
import { useRouter } from 'next/navigation';
import { useNoteDraft } from '@/lib/store/noteStore';
import { ChangeEvent } from 'react';

const validation = Yup.object({
    title: Yup.string().min(3).max(50).required(),
    content: Yup.string().max(500).required(),
    tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required()
})

export default function NoteForm() {
    const router = useRouter()
    const onCancel = router.back
    

    const handleSubmit = async (formData: FormData) =>{
        const initialValues = {
        title: String(formData.get("title") ?? ""),
        content: String(formData.get("content") ?? ""),
        tag : String(formData.get("tag") ?? ""),
        }
        const validated = await validation.isValid(initialValues)
        if (!validated) return 
    
        await createNote(initialValues)
        draft.clearDraft()
        router.push('/notes/filter/all')

    }
        const draft = useNoteDraft()
        const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            draft.setDraft({[name]: value})
        }
    return (
    <form action={handleSubmit} className={css.form} >
        <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className={css.input} value={draft.note.title} onChange={handleChange}/>
        </div>

        <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea value={draft.note.content} onChange={handleChange}
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
        />
        </div>

        <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select  value={draft.note.tag} onChange={handleChange}
        id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
        </select>
        </div>

        <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
        </button>
        <button type="submit" className={css.submitButton} >
            Create note
        </button>
        
        </div>
    </form>
    );
}