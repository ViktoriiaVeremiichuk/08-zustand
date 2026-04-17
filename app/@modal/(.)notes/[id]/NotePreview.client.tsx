'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.client.module.css';

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  
  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <div className={css.statusMessage}>Завантаження нотатки...</div>
      </Modal>
    );
  }


  if (isError || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <div className={css.statusMessage}>Помилка: Нотатку не знайдено</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>

          <button onClick={() => router.back()} className={css.closeButton}>
            &times;
          </button>
        </div>

        {note.tag && <span className={css.tag}>#{note.tag}</span>}

        <p className={css.text}>{note.content}</p>
      </div>
    </Modal>
  );
}
