'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NoteDetails.client.module.css';

export default function NoteDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: note, isError } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back(); 
  };

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.error}>Note not found</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
        </div>
        {note.tag && <span className={css.tag}>#{note.tag}</span>}
        <p className={css.content}>{note.content}</p>
      </div>
    </Modal>
  );
}
