import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  modalKey?: string | null;
  isOpenModal: boolean;
  mode?: "add" | "edit" | null;
  changeIsOpenModal: (isOpen?: boolean) => void;
  changeMode: (mode: "add" | "edit" | null) => void;
  changeKey: (id: string | null) => void;
}

const store = create<StoreState>((set) => ({
  modalKey: null,
  isOpenModal: false,

  changeIsOpenModal: (isOpen) =>
    set(
      produce((draft) => {
        draft.isOpenModal = isOpen;
      }),
      false
    ),

  changeMode: (mode: "add" | "edit" | null = null) =>
    set(
      produce((draft) => {
        draft.mode = mode;
      }),
      false
    ),

  changeKey: (id: string | null) =>
    set(
      produce((draft) => {
        draft.modalKey = id;
      }),
      false
    ),
}));

export const modalStore = store;
