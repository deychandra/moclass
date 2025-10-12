import React, { createContext, useReducer } from "react";
import { getFromLocal } from "./store_comm_fnc";

const InitialState = {
    id: getFromLocal("id", 0),
    name: getFromLocal("name", ""),
    email: getFromLocal("email", ""),
    token: getFromLocal("token", ""),
    userType: getFromLocal("userType", ""),


};

function reducer(state, action) {
    switch (action.type) {
        case "id":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("id", local_value)
            return {
                ...state,
                id: action.value,
            };
        case "token":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("token", local_value)
            return {
                ...state,
                token: action.value,
            };
        case "userType":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("userType", local_value)
            return {
                ...state,
                userType: action.value,
            };

        case "name":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("name", local_value)
            return {
                ...state,
                name: action.value,
            };

        case "email":
            var local_value = JSON.stringify(action.value);
            localStorage.setItem("email", local_value)
            return {
                ...state,
                email: action.value,
            };

        case "reset":
            return { ...InitialState };

        case "firstLoad":
            return {
                ...state,
                id: getFromLocal("id", 0),
                name: getFromLocal("name", ""),
                email: getFromLocal("email", ""),
                token: getFromLocal("token", ""),
                userType: getFromLocal("userType", ""),
            };

        default:
            return { ...state };
    }
}

export const userContext = createContext();

function Store({ children }) {
    const [user, dispatch] = useReducer(reducer, InitialState);


    return (
        <userContext.Provider value={{ user, dispatch }}>
            {children}
        </userContext.Provider>
    );
}

export default Store;
