import '../styles/globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Mega Task | To-Do List',
  description: 'A melhor forma de organizar suas tarefas!',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout( { children }: { children: React.ReactNode } ) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}