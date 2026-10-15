import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type NoteProps = {
  params: Promise<{slug: string[]}>
}
export async function generateMetadata({params} : NoteProps) : Promise<Metadata>{
    const {slug} = await params;
  const tag = slug[0] ==="all" ? undefined : slug [0];
  const title = tag? `Category: ${tag}` : 'All Notes'
  const description = tag ? `Filtered by ${tag}` : 'All Notes'
return {title, description, 
  openGraph : {
    title, 
    description,
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
}

export default async function NotesPage ({params}: NoteProps){
  
  const {slug} = await params;
  const tag = slug[0] ==="all" ? undefined : slug [0];
  

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag], 
    queryFn: () => fetchNotes({ page: 1, query: "" , tag}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}