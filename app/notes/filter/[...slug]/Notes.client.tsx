'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { NotesResponse } from '@/lib/api';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface NotesClientProps {
  currentTag?: string;
}

function NotesClient({ currentTag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const { data, isLoading, isError, isSuccess } = useQuery<NotesResponse>({
    queryKey: ['notes', page, search, currentTag],
    queryFn: () => fetchNotes({ page, perPage, search, tag: currentTag }),
    placeholderData: keepPreviousData,
  });

  if (isError) return <p>Error!</p>;

  return (
    <div>
      <header>
        <SearchBox search={search} onSearch={handleSearch} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button onClick={openModal}>Create note +</button>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onSuccess={closeModal} />
          </Modal>
        )}
      </header>

      {isLoading ? (
        <p>Loading, please wait...</p>
      ) : data?.notes.length === 0 ? (
        <p>Empty list</p>
      ) : (
        <NoteList notes={data?.notes ?? []} />
      )}
    </div>
  );
}

export default NotesClient;
