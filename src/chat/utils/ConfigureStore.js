import {configureStore, createSlice} from '@reduxjs/toolkit';

const GlobalSlice = createSlice({
    name:'Slice',
    initialState:{
        onBusy:false,
        UserMessage:'',
        ChatLength:0,
        UserOptions: ['Option 1','Option 2','Option 3']
    },
    reducers:{
        update_onBusy: (state,data) =>{
            state.onBusy = data.payload;
        },
        update_UserMessage : (state,data) =>{
            state.UserMessage = data.payload;
        },
        update_ChatLength : (state,data) =>{
            state.ChatLength = data.payload;
        },
        update_UserOptions: (state,data) =>{
            state.UserOptions = data.payload;
        },
        
    }
});

export const {update_onBusy,update_UserMessage,update_ChatLength,update_UserOptions} = GlobalSlice.actions;

const Store = configureStore({reducer:GlobalSlice.reducer});

export default Store; 