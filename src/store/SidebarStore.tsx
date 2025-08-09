import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  isSidebarOpen: boolean;
  toggleSidebar: (isOpen: boolean) => void;
}

const store = create<StoreState>((set) => ({
  isSidebarOpen: false,

  toggleSidebar: (isOpen: boolean) =>
    set(
      produce((draft) => {
        draft.isSidebarOpen = !isOpen;
      }),
      false
    ),
}));

export const sidebarStore = store;
