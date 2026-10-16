'use client'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from '@/components/NoteList/NoteList'
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import {  fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from '../../[id]/Notes.client.module.css'
import {useRouter} from "next/navigation";

type NotesClientProps = {
  tag?: string
}

export default function App({tag} :NotesClientProps){

  const router = useRouter();
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const {data, isLoading, isError} = useQuery({
    queryKey: ["notes", page, search, tag], 
    queryFn: ()=> fetchNotes({page, query: search, tag}),
    placeholderData: keepPreviousData
  })
  const notes = data?.notes ?? [];
  const debouncedSearch = useDebouncedCallback((value) =>{
    setSearch(value);
    setPage(1)
  }, 300)


  return (
  <div className={css.app}>
    <header className={css.toolbar}>
      <SearchBox
        value={inputValue}
        onSearch={(value) => {
          setInputValue(value);
          debouncedSearch(value);
          setPage(1);
        }}
      />

      <button
        className={css.button}
        onClick={() => router.push('/notes/action/create')}
      >
        Create note +
      </button>
    </header>

    {isLoading && <p>Loading...</p>}

    {isError && <p>Error loading notes</p>}

    {!isLoading && !isError && (
      <>
        {notes.length > 0 ? (
          <NoteList
            notes={notes}/>
        ) : (
          <p>No notes found</p>
        )}
       

        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onChange={setPage}
          />
        )}
      </>
    )}

  </div>
);}