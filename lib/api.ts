import axios from 'axios';
import type { CreateNote, Note } from '@/types/note';
import type { Category } from '@/types/category';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search = '',
  tag,
}: FetchNotesParams = {}): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      tag,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};

export async function getCategories() {
  const { data } = await axios.get<Category[]>('/categories');
  return data;
}
