import { atom } from "recoil";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const modalIDstate = atom<string>({
  key: "modalId",
  default: "",
});

export const modalConfirmState = atom<boolean>({
  key: "modalConfirm",
  default: false,
});

export const modalConfirmIdState = atom<string>({
  key: "modalConfirmId",
  default: "",
});
