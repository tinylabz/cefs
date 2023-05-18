import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

type User = {
    _id: string;
    studentNumber?: string;
    registrationNumber?: string;
    email: string;
    phone?: string;
    name: string;
    college?: string;
    school?: string;
    designation: string;
    gender: string;
    token: string;
} | {
    _id: string;
    email: string;
    name: string;
    college?: string;
    school?: string;
    designation: string;
    token: string;
} | null;

type State = {
    user: User;
    closed: boolean;
    toggleClosed: () => void;
    setUser: (user: User) => void;
};

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                closed: false,
                user: null,
                setUser: (user) => set((state) => ({ user })),
                toggleClosed: () => set((state) => ({ closed:!closed })),
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
