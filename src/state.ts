import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

type State = {
    count: number;
    user: string;
    setUser: (user: string) => void;
    increment: (by: number) => void;
    decrement: (by: number) => void;
};

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                count: 0,
                user: '',
                setUser: (user) => set((state) => ({ user })),
                increment: (by) =>
                    set((state) => ({ count: state.count + by })),
                decrement: (by) =>
                    set((state) => ({ count: state.count - by })),
            }),
            {
                name: 'store-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
