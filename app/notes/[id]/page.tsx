import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await fetchNoteById(id);

    return {
      title: `${response.title} - NoteHub`,
      description: response.content,
      openGraph: {  
        title: `${response.title} - NoteHub`,
        description: response.content,
        type: 'article',
        url: `http://localhost:3000/notes/${id}`,
        images: [{
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: response.title,
        }]
      }
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: 'Note - NoteHub',
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const state = queryClient.getQueryState(['notes', id]);

  if (state?.status === 'error' || !state?.data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
