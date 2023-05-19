import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

export type User =
    | {
          _id: string;
          studentNumber?: string;
          registrationNumber?: string;
          email: string;
          phone?: string;
          name: string;
          college?: string;
          school?: string;
          isEmailVerified: boolean;
          designation: string;
          token: string;
      }
    | {
          _id: string;
          email: string;
          name: string;
          college?: string;
          school?: string;
          designation: string;
          isEmailVerified: boolean;
          token: string;
      }
    | null;

export type State = {
    user: User;
    isClosed: boolean;
    toggleIsClosed: () => void;
    setUser: (user: User) => void;
};

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                isClosed: false,
                user: null,
                setUser: (user) => set((state) => ({ user })),
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
