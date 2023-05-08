import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

type User = {
    _id: string;
    stdNo: string;
    regNo: string;
    email: string;
    phone: string;
    name: string;
    college: string;
    token: string;
} | null;

type State = {
    count: number;
    user: User;
    setUser: (user: User) => void;
};

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                count: 0,
                user: null,
                setUser: (user) => set((state) => ({ user })),
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
