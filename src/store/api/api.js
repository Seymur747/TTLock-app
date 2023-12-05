
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://euapi.ttlock.com' }),
  
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        const formBody = 
        Object.keys(credentials).map(key =>encodeURIComponent(key) + '=' + encodeURIComponent(credentials[key])).join('&');
        return {
          url: '/oauth2/token',
          method: 'POST',
          body:formBody,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      }
    }),

    getLockList: builder.query({
      query: async() => {
        const userDatas = await AsyncStorage.getItem('userDatas')
        const {clientId,access_token:accessToken,} = JSON.parse(userDatas)
        return {
          url: '/v3/lock/list',
          method: 'GET',
          params:{
            clientId,
            accessToken,
            pageNo:1,
            pageSize:100,
            date:Date.now(),
          },
        }
      }
    }),
  }),
});

export const { useLoginMutation ,useGetLockListQuery} = api
