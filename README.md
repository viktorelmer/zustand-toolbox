A small library for zustand to reduce amount of files and code in your store.

```bash
npm i zustand-toolbox --save-dev
```

## Auto selectors generator

First you need to initiate your store, for this use lib function - **create**, this function return array where first element default zustand store hook and second selector function, next section will show how to use this function  

```tsx
import { create } from "zustand-toolbox"

type TParams = {
    bears: 0;
}

type TFunctions = {
    setPopulation: (amount: number) => void;
    increasePopulation: () => void;
}

type TStore = TParams & TFunctions;

export const [useBearStore, getBearStoreSelectors] = create<TStore>((set) => ({
  bears: 0,
  setPopulation: (amount: number) => set((state) => ({ bears: amount })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}))
```

## Direct store param access

To get store param or function you just need to pass param/function name

```tsx
function BearCounter() {
  const bears = useBearStore("bears")
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore("increasePopulation")
  return <button onClick={increasePopulation}>one up</button>
}
```

## How to use getSelector function

You also can use selector function to get store param or function, all what you need to pass selector function into useStoreHook and choose store param/function that you need

```tsx
function BearCounter() {
  const bears = useBearStore(getBearStoreSelectors("bears"))
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore(getBearStoreSelectors("increasePopulation"))
  return <button onClick={increasePopulation}>one up</button>
}
```

### Why it's help

Usually developers create file to store all selectors

```tsx
// selector.ts

const bears = (state: TStore) => state.bears;
const getSetPopulation = (state: TStore) => state.getSetPopulation;
const getIncreasePopulation = (state: TStore) => state.increasePopulation;
```
With **ausg** library you don't need to create selectors by your self, library generate them automatically


## Actions unpacker

How actions working without lib

```tsx
// actions.ts
import type { TSetState } from "zustand-toolbox/src/utils/types/store";

const setPopulation = (set: TSetState<TStore>) => (amount: number) => {
    set((state) => ({ bears: amount }));
}

const increasePopulation = (set: TSetState<TStore>) => () => {
    set((state) => ({ bears: state.bears + 1 }))
}

export const actions = {
    setPopulation,
    increasePopulation,
}
```


```tsx
import { create } from 'zustand'
import { actions } from './actions'

export const useBearStore = create((set) => ({
  bears: 0,
  setPopulation: actions.setPopulation(set),
  increasePopulation: actions.increasePopulation(set),
}))
```

Instead of redeclare actions in store like above, you can use lib to make it easier

```tsx
import { create } from 'zustand'
import { create, unpackActions } from "zustand-toolbox"
import { actions } from './actions'

type TParams = {
    bears: 0;
}

type TFunctions = {
    setPopulation: (amount: number) => void;
    increasePopulation: () => void;
}

type TStore = TParams & TFunctions;

export const [useBearStore, getBearStoreSelectors] = create<TStore>((set) => ({
    bears: 0,
    ...unpackActions<TFunctions>(actions, set),
}))
```

and that's all, no more boilerplate code


## Get state outside of component

You still can get access to store outside of component like in example below

```ts
function getBearsAmount() {
    const bears = useBearStore().getState().bears;

    return bears;
}


console.log(`We have ${getBearsAmount()} now`)
```

## Default zustand store

You can use default zustand if you need, it's 3rd param in array [customStore, selectors, **defaultZustandStore**]

```tsx
import { create } from 'zustand'
import { create, unpackActions } from "zustand-toolbox"
import { actions } from './actions'

type TParams = {
    bears: 0;
}

type TFunctions = {
    setPopulation: (amount: number) => void;
    increasePopulation: () => void;
}

type TStore = TParams & TFunctions;

export const [_, getBearStoreSelectors, useBearStore] = create<TStore>((set) => ({
    bears: 0,
    ...unpackActions<TFunctions>(actions, set),
}))
```
