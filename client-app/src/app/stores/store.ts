import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import JobStore from "./jobStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    jobStore: JobStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    jobStore: new JobStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}