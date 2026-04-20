import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

import type { Metadata } from 'next';

interface NoteFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NoteFiltersProps): Promise<Metadata> {
  const { slug } = await params;

  const filterName = slug.join(' / ');

  return {
    title: `${filterName}-NoteHub`,
    description: `View notes by category: ${filterName}`,
    openGraph: {
      title: `${filterName}-NoteHub`,
      description: `View notes by category: ${filterName}`,
      type: 'article',
      url: `http://http://localhost:3000/notes/${filterName}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `View notes by category: ${filterName}`,
        },
      ],
    },
  };
}

async function NoteFilters({ params }: NoteFiltersProps) {
  const { slug } = await params;

  const currentTag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag: currentTag,
      }),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient currentTag={currentTag} />
      </HydrationBoundary>
    </main>
  );
}

export default NoteFilters;
