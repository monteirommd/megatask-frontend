const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http:/localhost:3001/api'

export async function login(email: string, password: string) {
    if(email === 'teste@exemplo.com' && password === '123456') {
        return { token: 'fake-jwt-token', user: { email }};
    }

    throw new Error('Usuário ou senha inválidos');
}

export async function register(name:string, email: string, password: string) {
    return { message: 'Usuário registrado com sucesso' };

    throw new Error('Erro ao cadastrar');
    
} 