import css from "./FiltersLayout.module.css"

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

function NotesLayout({ sidebar, children }: NotesLayoutProps) {
  return (
   <div className={css.container}>
      <aside className={css.sidebarWrapper}>
        {sidebar}
      </aside>
      <main className={css.contentWrapper}>
        {children}
      </main>
    </div>
  );
}

export default NotesLayout;
