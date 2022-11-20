import { createSlice } from '@reduxjs/toolkit'
import {SCREEN_ITEMS} from "../../types/Constants";

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState: {
        value: [SCREEN_ITEMS.MyQuestions],
    },
    reducers: {
        addScreen: (state, action) => {
            state.value.push(action.payload)
        },
        goToPreviousScreen: (state) => {
            state.value.splice(-1);
        }
    }
})

export const breadcrumbArray = (state) => state.breadcrumb.value

// Action creators are generated for each case reducer function
export const { addScreen, goToPreviousScreen } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer