import { StoreApi, UseBoundStore } from "zustand";
import type { ISelector, TSetState, TGetState, TStoreActions, TStoreFullAction } from "../utils/types/store";
/**
 * Unpack store actions object.
 * @param packedActions all store actions imported from file
 * @param setState setState action
 * @param getState getState action
 */
declare const unpackActions: <T extends object, K extends keyof T>(packedActions: Record<K, TStoreFullAction<T>>, setState: TSetState<T>, getState?: TGetState<T>) => TStoreActions<T, K>;
declare const create: <T extends object>(initState: (set: TSetState<T>, get: TGetState<T>) => T) => [{
    <K extends keyof T, TK extends T[K]>(value: K | ((state: T) => TK)): TK;
    (value?: undefined): UseBoundStore<StoreApi<T>>;
}, ISelector<T>, UseBoundStore<StoreApi<T>>];
export { unpackActions, create, };
