import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import postsReducer from './slices/postsSlice/postsSlice'
import usersReducer from './slices/usersSlice/usersSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch