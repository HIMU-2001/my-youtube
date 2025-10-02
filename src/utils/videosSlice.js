import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videoList: [],
  },
  reducers: {
    addVideos: (state, action) => {
      state.videoList = action.payload;
    },
  },
});

export const { addVideos } = videosSlice.actions;

export default videosSlice.reducer;
