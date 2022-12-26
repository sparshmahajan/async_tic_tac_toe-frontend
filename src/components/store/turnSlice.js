import { createSlice, configureStore } from "@reduxjs/toolkit";

let initialState = {
    userName : localStorage.getItem("userName") ? localStorage.getItem("userName") : "",
    turn: "",
    isGameActive: false,
    isLoggedin: localStorage.getItem("token") ? true : false,
    board : ["", "", "", "", "", "", "", "", ""],
}

const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        changeTurn: (state, action) => {
            state.turn = action.payload;
        },
        changeIsGameActive: (state, action) => {
            console.log("action.payload", action.payload);
            state.isGameActive = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        changeIsLoggedin: (state, action) => {
            state.isLoggedin = action.payload;
        },
        changeBoard: (state, action) => {
            state.board = action.payload;
        },
        addElementToBoard: (state, action) => {
            state.board[action.payload.index] = action.payload.value;
        }
    }
});

const store = configureStore({
    reducer: turnSlice.reducer
});

export const { changeTurn, changeIsGameActive,setUserName,changeIsLoggedin,changeBoard,addElementToBoard } = turnSlice.actions;
export default store;
