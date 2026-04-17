import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NoteFiltersProps {
  params: Promise<{ slug: string[] }>;
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
        <NotesClient currentTag={currentTag}/>
      </HydrationBoundary>
    </main>
  );
}

export default NoteFilters;
