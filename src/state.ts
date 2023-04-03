import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

type State = {
    count: number;
    user: any;
    increment: (by: number) => void;
    decrement: (by: number) => void;
};

export const useState = create<State>()(
    devtools(
        persist(
            (set) => ({
                count: 0,
                user: null,
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
