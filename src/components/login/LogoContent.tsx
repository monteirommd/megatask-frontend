import Image from "next/image";

export default function LogoContent(){
    return(
        <div className='bg-[#1E1E1E] lg:m-[10px] lg:rounded-4xl lg:flex-1 flex flex-col items-center justify-center p-8 lg:p-4 align-middle'>
            <div className='flex lg:flex-col justify-center items-center align-middle gap-x-4'>
                <Image
                    src="/favicon.svg"
                    alt="Logo Mega Task"
                    width={1}
                    height={1}
                    className='bg-clip-content lg:w-3xs'
                    priority
                />
                <h1 
                    className='text-white font-bold text-center text-2xl lg:text-5xl lg:mt-4'>
                    Mega Task
                </h1>
            </div>
        </div>
    );
}