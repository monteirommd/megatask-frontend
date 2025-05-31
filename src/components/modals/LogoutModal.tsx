import { useAuth } from '@/context/AuthContext'
import { Modal } from '../Modal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { logout, user } = useAuth();

  const router = useRouter();


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sair">
      <div className="flex flex-col items-center gap-4">
        <Image 
          alt='Logo MegaTask'
          src='/favicon.svg'
          width={150}
          height={150}
        />
        <p className="text-center font-bold text-2xl mb-6">Tem certeza que deseja sair?</p>
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => {
              logout();
              router.push('/login')
            }}
            className="bg-[#82203C] hover:bg-[#982A35] flex-1 font-semibold text-xl 
            transition-colors duration-150 ease-in-out rounded-xl py-1 cursor-pointer"
          >
            Sim, sair
          </button>
          <button
            onClick={onClose}
            className="hover:bg-[#5a5a5a]/40 text-white/40 hover:text-white/60 ease-in-out
            flex-1 font-semibold text-xl rounded-xl py-1 cursor-pointer transition-colors duration-150"
          >
            Não, irei ficar
          </button>
        </div>
      </div>
    </Modal>
  );
}