import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import JobStore from "./jobStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    jobStore: JobStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
}

export const store: Store = {
    jobStore: new JobStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}