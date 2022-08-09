import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";

const reducer = combineReducers({
    anecdotes: anecdoteReducer
})

export const store = configureStore({
    reducer
})