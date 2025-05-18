export default function EmailInput({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }){
    return(
        <div className='relative w-full max-w-3xl mb-4'>
            <label htmlFor="email" className="block mb-1 font-semibold">E-mail:</label>
            <input
                id="email"
                name="email"
                value={value}
                onChange={onChange}
                className="border rounded-lg border-solid p-[10px] w-full"
                type="email"
                required
                placeholder="Digite seu E-mail aqui"/>
        </div>
    );
}