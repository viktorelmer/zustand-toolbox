import type { StoreApi } from "zustand";
type TSetState<T> = StoreApi<T>["setState"];
type TStoreAction = (...args: any[]) => any;
type TStoreFullAction<T> = (set: TSetState<T>) => TStoreAction;
type TStoreActions<T> = Record<keyof T, TStoreAction>;
type ISelector<T> = <K extends keyof T>(key: K) => (state: T) => T[K];
export type { ISelector, TSetState, TStoreAction, TStoreActions, TStoreFullAction, };
