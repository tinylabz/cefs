import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

export type User = {
    _id: string;
    studentNumber?: string;
    registrationNumber?: string;
    email: string;
    name: string;
    college?: string;
    school?: string;
    isEmailVerified: boolean;
    designation: string;
} | null;

type Token = string | null;
export type State = {
    user: User;
    token: Token;
    isClosed: boolean;
    toggleIsClosed: () => void;
    setUser: (user: User) => void;
    setToken: (token: Token) => void;
};

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                isClosed: false,
                user: null,
                token: '',
                setUser: (user) => set((state) => ({ user })),
                setToken: (token) => set((state) => ({ token })),
                toggleIsClosed: () =>
                    set((state) => ({ isClosed: !state.isClosed })),
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
