
import {fetchNoteById} from '@/lib/api'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query' 
import NoteDetailsClient from './NoteDetails.client'
import type { Metadata } from "next";

interface ViewDetailsProps{
  params: Promise<{id: string}>
}

export async function generateMetadata({params} :ViewDetailsProps) :Promise<Metadata> {
const {id} = await params
const {title, content: description} = await fetchNoteById(id)
  return{
    title,
    description,
    openGraph : {
    title, 
    description,
    url: `https://notehub.com/notes/${id}`,
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
}

const ViewDetails = async ({params} :ViewDetailsProps) => {
  const {id} = await params

  const queryClient = new QueryClient()
   await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    })

  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>)
}

export default ViewDetails