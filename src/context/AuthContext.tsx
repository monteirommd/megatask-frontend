    'use client'

    import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
    import Cookies from 'js-cookie';

    type User = {
        id: number;
        nome: string;
        email: string;
    };

    type AuthContextType = {
        user: User | null;
        token: string | null;
        login: (token: string, user: User) => void;
        logout: () => void;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: { children: ReactNode }) => {
        const [user, setUser] = useState<User | null>(null)
        const [token, setToken] = useState<string | null>(null)

        useEffect(() => {
            const tokenFromCookie = Cookies.get('token');
            const userFromCookie = Cookies.get('user');

            if(tokenFromCookie && userFromCookie) {
                setToken(tokenFromCookie);
                setUser(JSON.parse(userFromCookie));
            }
        }, [])

        const login = (token:string, user: User) => {
            setToken(token);
            setUser(user);
            Cookies.set('token', token, { expires: 1 })
            Cookies.set('user', JSON.stringify(user), { expires: 1 })
        };

        const logout = () => {
            setToken(null);
            setUser(null);
            Cookies.remove('token')
            Cookies.remove('user')
        };

        return (
            <AuthContext.Provider value={{ user, token, login, logout}}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => {
        const context = useContext(AuthContext);
        if (context === undefined){
            throw new Error('useAuth deve ser usado dentro de AuthProvider');
        }
        return context;
    };