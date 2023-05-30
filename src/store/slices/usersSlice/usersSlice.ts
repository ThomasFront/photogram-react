
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadingVariants, UserType } from '../../../types/common'
import { RootState } from '../../store'
import { UsersState } from './types'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const initialState: UsersState = {
  newUsers: [],
  loadings: {
    getNewUsers: LoadingVariants.idle,
  },
  errors: {
    getNewUsers: null,
  }
}

export const getNewUsers = createAsyncThunk<Array<UserType>, void, {rejectValue: string}>(
  'posts/getNewUsers',
  async(_, { rejectWithValue }) => {
    try {
      const users: Array<UserType> = []
      const querySnapshot = await getDocs(query(collection(db, "users"), limit(5)));
      querySnapshot.forEach((doc) => {
        users.unshift(doc.data() as UserType)
      });
      return users
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewUsers.fulfilled, (state, {payload}) => {
      state.newUsers = payload
      state.errors.getNewUsers = null
      state.loadings.getNewUsers = LoadingVariants.succeeded
    })
    builder.addCase(getNewUsers.pending, (state) => {
      state.errors.getNewUsers = null
      state.loadings.getNewUsers = LoadingVariants.pending
    })
    builder.addCase(getNewUsers.rejected, (state, { payload }) => {
      state.errors.getNewUsers = payload as string
      state.loadings.getNewUsers = LoadingVariants.failed
    })
  },
})

export const newUsersSelector = (state: RootState) => state.users.newUsers
export const errorsSelector = (state: RootState) => state.users.errors
export const loadingsSelector = (state: RootState) => state.users.loadings
export default usersSlice.reducer