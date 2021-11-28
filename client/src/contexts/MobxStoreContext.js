import React from "react";
import {useLocalObservable} from "mobx-react";

export const StoreContext = React.createContext();

const StoreProvider = ({children}) => {
    const store = useLocalObservable(() => ({
        userName: '',
        message: '',
        isScheduleLater: false,
        isTwitterCheckBoxFlag: false,
        isSlackCheckBoxFlag: false,
        isTeamsCheckBoxFlag: false,
        scheduler: '',
        mediaFile: [],
        dateSchedule: new Date(),
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
export default StoreProvider
