import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    todos: [{ id: 1, text: "Hello Mia" }]
};


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(x => x.id != action.payload)
        },

        /* Now you have to implement Update and Delete */
    }
})

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer