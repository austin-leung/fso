import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: combineReducers({
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer
    })
})

export default store