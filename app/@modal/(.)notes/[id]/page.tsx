import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';
import { notFound } from 'next/navigation';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

async function NotePage({ params }: NotePreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData(['note', id]);
  if (!note) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}

export default NotePage;
