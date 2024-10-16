import Image from 'next/image';
import { Edu_VIC_WA_NT_Beginner } from 'next/font/google';
import { useEffect } from 'react';

const edu = Edu_VIC_WA_NT_Beginner({
  weight: '700',
  subsets: ['latin'],
});

interface InstructionProps {
  onClose: () => void;
}

const Instruction: React.FC<InstructionProps> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-backdrop-black z-10"
      onClick={onClose}
    >
      <div
        className="w-fit h-fit absolute top-0 left-0 bottom-0 right-0 m-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={edu.className}>
          <h1 className="text-3xl text-white font-bold">
            🚀 Get Your Business Up and Running 🏢💼
          </h1>
        </div>

        <Image
          src="/illustrations/arrow-down.png"
          width={400}
          height={400}
          alt="arrow down"
        />
      </div>
    </div>
  );
};

export default Instruction;
