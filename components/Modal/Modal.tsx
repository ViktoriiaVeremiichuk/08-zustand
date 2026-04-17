'use client';

import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, router]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      {' '}
      <div className={css.modal}>
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
};

export default Modal;
