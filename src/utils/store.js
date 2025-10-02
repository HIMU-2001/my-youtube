import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import searchReducer from "./searchSlice";
import chatReducer from "./chatSlice";
import videoReducer from "./videosSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    chat: chatReducer,
    video: videoReducer,
  },
});

export default store;
