import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

export const store = configureStore({
    reducer
})