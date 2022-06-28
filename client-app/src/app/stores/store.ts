import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import JobStore from "./jobStore";

interface Store {
    jobStore: JobStore
    commonStore: CommonStore
}

export const store: Store = {
    jobStore: new JobStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}