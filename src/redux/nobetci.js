import { createSlice } from '@reduxjs/toolkit'

const nobetciSlice = createSlice({
    name: 'nobetci',
    initialState: [],
    reducers: {
        updateList: (state, action) => {
            return state = action.payload
        },
    }
})

export const { updateList } = nobetciSlice.actions

export default nobetciSlice.reducer