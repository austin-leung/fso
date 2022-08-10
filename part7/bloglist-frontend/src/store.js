import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: combineReducers({
        blogs: blogReducer,
        notification: notificationReducer
    })
})

export default store