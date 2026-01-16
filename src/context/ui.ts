import { create } from "zustand";

interface UIState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  errorMsg: string | null;
  setErrorMsg: (msg: string | null) => void;
}

export const useUIContext = create<UIState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  errorMsg: null,
  setErrorMsg: (msg) => set({ errorMsg: msg }),
}));
