import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
// console.log(AsyncStorage)

export const authSlice = createSlice({
    name:'auth',
    initialState:{isLoginned:false},
    reducers:{
        setUserDatas:(state,{payload})=>{
             AsyncStorage.setItem('userDatas', JSON.stringify(payload)).catch(err=>console.log('err'))
            state.isLoginned = true;
        }
    }
})

// export const {actions,reducer} =authSlice
export const {setUserDatas } = authSlice.actions

export default authSlice.reducer
