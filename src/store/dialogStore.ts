import { produce } from "immer";
import { create } from "zustand";
import { ReactNode } from "react";

interface StoreState {
  isOpen: boolean;
  title: string | ReactNode;
  body: string | ReactNode;
  maxWidth: string;
  overflowY: "visible" | "hidden" | "clip" | "scroll" | "auto";
  hasCancelBtn: boolean;
  hasOkBtn: boolean;
  isTransparentBackground: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  changeOpen: (isOpen: boolean) => void;
  changeBody: (text: string | ReactNode) => void;
  changeTitle: (title: string | ReactNode) => void;
  changeOnToggle: (func: () => void) => void;
  changeOnCancel: (func: () => void) => void;
  changeOnOk: (func: () => void) => void;
  changeHasCancelBtn: (hasCancelBtn: boolean) => void;
  changeHasOkBtn: (hasOkBtn: boolean) => void;
  changeMaxWidth: (hasOkBtn: string) => void;
  changeOverflowY: (
    overflowY: "visible" | "hidden" | "clip" | "scroll" | "auto"
  ) => void;
  changeIsTransparentBackground: (isTransparent: boolean) => void;
}

const store = create<StoreState>((set) => ({
  isOpen: false,
  title: "",
  body: "",
  hasOkBtn: true,
  hasCancelBtn: true,
  maxWidth: "70%",
  overflowY: "auto",
  isTransparentBackground: false,

  changeOpen: (isOpen) =>
    set(
      produce((draft) => {
        draft.isOpen = isOpen;
      }),
      false
    ),
  changeBody: (text) =>
    set(
      produce((draft) => {
        draft.body = text;
      }),
      false
    ),
  changeTitle: (title) =>
    set(
      produce((draft) => {
        draft.title = title;
      }),
      false
    ),
  changeOnToggle: (func) =>
    set(
      produce((draft) => {
        draft.onToggle = func;
      }),
      false
    ),
  changeOnCancel: (func) =>
    set(
      produce((draft) => {
        draft.onCancel = func;
      }),
      false
    ),
  changeOnOk: (func) =>
    set(
      produce((draft) => {
        draft.onOk = func;
      }),
      false
    ),
  changeHasCancelBtn: (hasCancelBtn) =>
    set(
      produce((draft) => {
        draft.hasCancelBtn = hasCancelBtn;
      }),
      false
    ),
  changeHasOkBtn: (hasOkBtn) =>
    set(
      produce((draft) => {
        draft.hasOkBtn = hasOkBtn;
      }),
      false
    ),
  changeMaxWidth: (maxWidth) =>
    set(
      produce((draft) => {
        draft.maxWidth = maxWidth;
      }),
      false
    ),
  changeOverflowY: (overflowY) =>
    set(
      produce((draft) => {
        draft.overflowY = overflowY;
      }),
      false
    ),
  changeIsTransparentBackground: (isTransparent) =>
    set(
      produce((draft) => {
        draft.isTransparentBackground = isTransparent;
      }),
      false
    ),
}));

export const useDialogStore = store;
