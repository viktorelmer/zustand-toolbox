import { StoreApi, UseBoundStore } from "zustand";
import type { ISelector, TSetState, TStoreActions, TStoreFullAction } from "../utils/types/store";
/**
 * Unpack store actions object.
 * @param packedActions all store actions imported from file
 * @param setState setState action
 */
declare const unpackActions: <T extends object>(packedActions: Record<keyof T, TStoreFullAction<T>>, setState: TSetState<T>) => TStoreActions<T>;
declare const create: <T extends object>(initState: (args: any) => T) => [{
    <K extends keyof T, TK extends T[K]>(value: K | ((state: T) => TK)): TK;
    (value?: undefined): UseBoundStore<StoreApi<T>>;
}, ISelector<T>, UseBoundStore<StoreApi<T>>];
export { unpackActions, create, };
