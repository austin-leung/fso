import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    })
})

export default store