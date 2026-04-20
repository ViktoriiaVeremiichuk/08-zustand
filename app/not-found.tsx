import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'Unfortunately, the requested page does not exist or has been deleted.',
  openGraph: {
    title: 'Page not found',
    description:
      'Unfortunately, the requested page does not exist or has been deleted.',
    type: 'article',
    url: `http://localhost:3000`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
  },
};

function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
