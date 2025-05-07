import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IContext {
    tokenState: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkToken: Function;
}

export const AuthContext = createContext({} as IContext);

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const navigate = useNavigate();

    async function login(email: string, password: string) {

        try {
            const response = await api.post('token/', { email, password });
            const { access } = response.data;

            localStorage.setItem('token', access);
            axios.defaults.headers.common.Authorization = `Bearer ${access}`;
            setTokenState(access);
            navigate('/home', { replace: true });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    async function logout() {
        setTokenState(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        navigate('/', { replace: true });
    }

    useEffect(() => {
        const tokenStorage = localStorage.getItem('token');

        if (tokenStorage) {
            axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
            setTokenState(tokenStorage);
        }

    }, []);

    function checkToken(namePage: string) {
        useEffect(() => {

            (async () => {

                const tokenStorage = localStorage.getItem('token');

                if (tokenStorage) {

                    try {
                        const data = await api.get('', {
                            headers: {
                                Authorization: `Bearer ${tokenStorage}`,
                            },
                        });

                        if (data.status === 200) {
                            if (!namePage) return;

                            navigate(`${namePage}`, { replace: true });
                        }
                    } catch (e) {
                        console.error('Erro ao verificar o token:', e);
                        navigate('/', { replace: true });
                    }

                } else {
                    navigate('/', { replace: true });
                }

            })();
        }, [namePage, navigate]);
    }

    return (
        <AuthContext.Provider value={{ tokenState, login, logout, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
}
