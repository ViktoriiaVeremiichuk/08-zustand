import css from "@/app/notes/action/create/CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Create a new note - NoteHub',
  description: 'Create and organize your personal notes in NoteHub.',
  openGraph: {
    title: 'Create a new note - NoteHub',
    description: 'Create and organize your personal notes in NoteHub.',
    type: 'article',
    url: `http://localhost:3000`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note - NoteHub',
      },
    ],
  },
};


async function CreateNote(){
  
  

return (
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm />
  </div>
</main>

)
}

export default CreateNote;