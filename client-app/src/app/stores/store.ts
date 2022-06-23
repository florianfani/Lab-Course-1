import { createContext, useContext } from "react";
import JobStore from "./jobStore";

interface Store {
    jobStore: JobStore
}

export const store: Store = {
    jobStore: new JobStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}