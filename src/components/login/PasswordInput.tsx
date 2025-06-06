'use client'

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

export default function PasswordInput({ value, onChange, title = "Senha:" }: { value: string, title?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }){
    const [showPassword, setShowPassword] = useState(false);

    return(
         <div className='relative w-full max-w-3xl mb-2'>
            <label htmlFor="password" className="block mb-1 font-semibold">{title}</label>
            <input 
                id="password"
                name="password"
                value={value}
                onChange={onChange}
                required
                className="border rounded-lg p-2.5 pl-3 pr-12 w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
            />
            <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 hover:text-gray-800'

            >
                {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
            </button>
        </div>
    );
}