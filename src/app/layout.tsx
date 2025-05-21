
import '../styles/globals.css'
import type { Metadata } from 'next'



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
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}