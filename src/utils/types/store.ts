import type { StoreApi } from "zustand";

type TSetState<T> = StoreApi<T>["setState"];

type TGetState<T> = StoreApi<T>["getState"];

type TStoreAction = (...args: any[]) => any;

type TStoreFullAction<T> = (set: TSetState<T>, get?: TGetState<T>) => TStoreAction;

type TStoreActions<T, K extends keyof T> = Record<K, TStoreAction>;

type ISelector<T> = <K extends keyof T>(key: K) => (state: T) => T[K];

export type {
    ISelector,
    TSetState,
    TGetState,
    TStoreAction,
    TStoreActions,
    TStoreFullAction,
};
