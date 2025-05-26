'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1E1E1E] rounded-lg shadow-xl w-full max-w-md p-6 relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white transition-colors duration-150 ease-in-out hover:text-gray-500 text-lg cursor-pointer"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}