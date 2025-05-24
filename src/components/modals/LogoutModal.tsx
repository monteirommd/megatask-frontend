import { Modal } from '../Modal';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sair">
      <div className="flex flex-col items-center gap-4">
        <p className="text-center">Tem certeza que deseja sair?</p>
        <div className="flex gap-4 w-full">
          <button
            onClick={() => router.push('/login')}
            className="bg-[#82203C] hover:bg-[#982A35] flex-1 rounded-xl py-1"
          >
            Sim, sair
          </button>
          <button
            onClick={onClose}
            className="bg-[#434242] hover:bg-[#5a5a5a] flex-1 rounded-xl py-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}