import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    previewDetails: null,
}

export const previewSlice = createSlice({
    name: "previewSlice",
    initialState,
    reducers: {
        setPreviewDetails: (state, action) => {
            state.previewDetails = action.payload;
        },
    }
});


export const {
    setPreviewDetails,
} = previewSlice.actions;

export default previewSlice.reducer;
