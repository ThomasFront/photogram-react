
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadingVariants, UserType } from '../../../types/common'
import { RootState } from '../../store'
import { SpecificUserDetailsType, UsersState } from './types'
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { PostType } from '../postsSlice/types'

const initialState: UsersState = {
  newUsers: [],
  specificUser: null,
  loadings: {
    getNewUsers: LoadingVariants.idle,
    getSpecificUserDetails: LoadingVariants.idle,
  },
  errors: {
    getNewUsers: null,
    getSpecificUserDetails: null,
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

export const getSpecificUserDetails = createAsyncThunk<SpecificUserDetailsType, string, {rejectValue: string}>(
  'posts/getSpecificUserDetails',
  async(userId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDetails = docSnap.data() as UserType
      const userPosts: Array<PostType> = []
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userPosts.unshift(doc.data() as PostType)
      });
      return {
        userDetails,
        userPosts
      }
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
    builder.addCase(getSpecificUserDetails.fulfilled, (state, {payload}) => {
      state.specificUser = payload
      state.errors.getSpecificUserDetails = null
      state.loadings.getSpecificUserDetails = LoadingVariants.succeeded
    })
    builder.addCase(getSpecificUserDetails.pending, (state) => {
      state.errors.getSpecificUserDetails = null
      state.loadings.getSpecificUserDetails = LoadingVariants.pending
    })
    builder.addCase(getSpecificUserDetails.rejected, (state, { payload }) => {
      state.errors.getSpecificUserDetails = payload as string
      state.loadings.getSpecificUserDetails = LoadingVariants.failed
    })
  },
})

export const newUsersSelector = (state: RootState) => state.users.newUsers
export const specificUserSelector = (state: RootState) => state.users.specificUser
export const errorsSelector = (state: RootState) => state.users.errors
export const loadingsSelector = (state: RootState) => state.users.loadings
export default usersSlice.reducer