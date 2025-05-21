export default function NameInput({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }){
    return(
        <div className='relative w-full max-w-3xl mb-4'>
            <label htmlFor="name" className="block mb-1 font-semibold">Nome:</label>
            <input
                id="name"
                name="name"
                value={value}
                onChange={onChange}
                className="border rounded-lg border-solid p-[10px] w-full"
                type="name"
                required
                placeholder="Digite seu Nome aqui"/>
        </div>
    );
}