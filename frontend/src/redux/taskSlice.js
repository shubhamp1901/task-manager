import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskListRefresh: false
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskListRefresh: (state, action) => {
            state.taskListRefresh = action.payload
        }
    }
})

export const { updateTaskListRefresh } = taskSlice.actions
export default taskSlice.reducer