import {create as createStore, StoreApi, UseBoundStore} from "zustand";

import type {
    ISelector,
    TSetState,
    TStoreActions,
    TStoreFullAction,
} from "../utils/types/store";

/**
 * Unpack store actions object.
 * @param packedActions all store actions imported from file
 * @param setState setState action
 */
const unpackActions = <T extends object>(
    packedActions: Record<keyof T, TStoreFullAction<T>>,
    setState: TSetState<T>,
): TStoreActions<T> => {
    const actionKeys = Object.keys(packedActions) as Array<keyof T>;
    return actionKeys.reduce((result, key) => {
        if (typeof packedActions[key] === "function") {
            if (typeof packedActions[key](setState) === "function") {
                return {...result, [key]: packedActions[key](setState)};
            } else {
                console.error(
                    `[unpackActions]: action with name "${String(key)}" has wrong return, it's should be \n(setState: SetState) => (...args: any[]) => {...}\nbut it \n(setState: SetState) => {...}`,
                );
            }
        } else {
            console.error(
                `[unpackActions]: action with name "${String(key)}" not a function, please check actions file`,
            );
        }

        return result;
    }, {} as TStoreActions<T>);
};

// Create store, return [useStoreHook, storeSelectors, defaultZustandStore]
const create = <T extends object>(
    initState: (args: any) => T,
): [
    {
        <K extends keyof T, TK extends T[K]>(value: K | ((state: T) => TK)): TK;
        (value?: undefined): UseBoundStore<StoreApi<T>>;
    },
    ISelector<T>,
    UseBoundStore<StoreApi<T>>
] => {
    const selectors: ISelector<T> = (key) => {
        return (state: T) => {
            return state[key];
        };
    };

    const createdStore = createStore<T>((set) => {
        return initState(set);
    });

    function store<K extends keyof T, TK extends T[K]>(
        value: K | ((state: T) => TK),
    ): TK;
    function store(value?: undefined): UseBoundStore<StoreApi<T>>;

    function store<K extends keyof T, TK extends T[K]>(
        value: undefined | K | ((state: T) => TK),
    ): TK | UseBoundStore<StoreApi<T>> {
        if (!value) {
            return createdStore;
        }

        if (typeof value === "function") {
            return createdStore(value);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return createdStore((state) => state[value]);
    }

    return [store, selectors, createdStore];
};

export {
    unpackActions,
    create,
};
