import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store' 
import { ChangeUserAvatarType, ChangeUsernameType, FollowUserArgsType, FollowUserType, LogInUserType, RegisterUserType, UserState } from './types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db, storage } from '../../../firebase/config'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { LoadingVariants, ThemeModeVariants, UserType } from '../../../types/common'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const initialState: UserState = {
  user: null,
  themeMode: ThemeModeVariants.light,
  loadings: {
    registerUser: LoadingVariants.idle,
    logInUser: LoadingVariants.idle,
    logOutUser: LoadingVariants.idle,
    getUser: LoadingVariants.idle,
    changeUserAvatar: LoadingVariants.idle,
    changeUsername: LoadingVariants.idle,
    followUser: LoadingVariants.idle,
  },
  errors: {
    registerUser: null,
    logInUser: null,
    logOutUser: null,
    getUser: null,
    changeUserAvatar: null,
    changeUsername: null,
    followUser: null,
  }
}

export const registerUser = createAsyncThunk<void, RegisterUserType, { rejectValue: string }>(
  'user/registerUser',
  async ({nick, email, password}, {rejectWithValue}) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nick,
        email,
        followers: [],
        followedBy: [],
        registeredTimestamp: Date.now()
      });
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const logInUser = createAsyncThunk<void, LogInUserType, {rejectValue: string}>(
  'users/logInUser',
  async ({email, password}, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const logOutUser = createAsyncThunk<void, void, {rejectValue: string}>(
  'users/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const getUserFromDatabase = createAsyncThunk<UserType, string, { rejectValue: string }>(
  'user/getUserFromDatabase',
  async (userUid, {rejectWithValue}) => {
    try {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);
      return docSnap.data() as UserType
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const changeUsername = createAsyncThunk<string, ChangeUsernameType, { rejectValue: string }>(
  'user/changeUsername',
  async ({userUid, newUsername}, {rejectWithValue}) => {
    try {
      const userRef = doc(db, "users", userUid);
      await updateDoc(userRef, {
        nick: newUsername,
      });
      return newUsername
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const changeUserAvatar = createAsyncThunk<string, ChangeUserAvatarType, { rejectValue: string }>(
  'user/changeUserAvatar',
  async ({userId, image}, {rejectWithValue}) => {
    try {
      const storageRef = ref(storage, `/avatars/${userId}`)
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef)
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        avatar: imageUrl
      });
      return imageUrl
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const followUser = createAsyncThunk<FollowUserType, FollowUserArgsType, { rejectValue: string }>(
  'user/followUser',
  async ({userUid, followerUid}, {rejectWithValue}) => {
    try {
      const userRef = doc(db, "users", userUid);
      const userDocSnap = await getDoc(userRef);
      const followers = userDocSnap.data()?.followers

      const followerRef = doc(db, "users", followerUid);
      const followerDocSnap = await getDoc(followerRef);
      const followedBy = followerDocSnap.data()?.followedBy
      
      if(!followers.includes(followerUid)){
        followers.push(followerUid)
        await updateDoc(userRef, {
          followers
        });
        followedBy.push(userUid)
        await updateDoc(followerRef, {
          followedBy
        });
      } else {
        const followerIndexToDelete = followers.findIndex((uid: string) => uid === followerUid)
        followers.splice(followerIndexToDelete, 1)
        await updateDoc(userRef, {
          followers
        });
        const followedByIndexToDelete = followedBy.findIndex((uid: string) => uid === followerUid)
        followedBy.splice(followedByIndexToDelete, 1)
        await updateDoc(followerRef, {
          followedBy
        });
      }
      return {
        followers,
        followedBy
      }
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    setThemeMode: (state, action: PayloadAction<ThemeModeVariants>) => {
      state.themeMode = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state) => {
      state.errors.registerUser = null
      state.loadings.registerUser = LoadingVariants.succeeded
    })
    builder.addCase(registerUser.pending, (state) => {
      state.errors.registerUser = null
      state.loadings.registerUser = LoadingVariants.pending
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.errors.registerUser = payload as string
      state.loadings.registerUser = LoadingVariants.failed
    })
    builder.addCase(logInUser.fulfilled, (state) => {
      state.errors.logInUser = null
      state.loadings.logInUser = LoadingVariants.succeeded
    })
    builder.addCase(logInUser.pending, (state) => {
      state.errors.logInUser = null
      state.loadings.logInUser = LoadingVariants.pending
    })
    builder.addCase(logInUser.rejected, (state, { payload }) => {
      state.errors.logInUser = payload as string
      state.loadings.logInUser = LoadingVariants.failed
    })
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user = null
      state.errors.logOutUser = null
      state.loadings.logOutUser = LoadingVariants.succeeded
    })
    builder.addCase(logOutUser.pending, (state) => {
      state.errors.logOutUser = null
      state.loadings.logOutUser = LoadingVariants.pending
    })
    builder.addCase(logOutUser.rejected, (state, { payload }) => {
      state.errors.logOutUser = payload as string
      state.loadings.logOutUser = LoadingVariants.failed
    })
    builder.addCase(getUserFromDatabase.fulfilled, (state, { payload }) => {
      state.user = payload
      state.errors.getUser = null
      state.loadings.getUser = LoadingVariants.succeeded
    })
    builder.addCase(getUserFromDatabase.pending, (state) => {
      state.errors.getUser = null
      state.loadings.getUser = LoadingVariants.pending
    })
    builder.addCase(getUserFromDatabase.rejected, (state, { payload }) => {
      state.errors.getUser = payload as string
      state.loadings.getUser = LoadingVariants.failed
    })
    builder.addCase(changeUserAvatar.fulfilled, (state, { payload }) => {
      if(state.user){
        state.user.avatar = payload
      }
      state.errors.changeUserAvatar = null
      state.loadings.changeUserAvatar = LoadingVariants.succeeded
    })
    builder.addCase(changeUserAvatar.pending, (state) => {
      state.errors.changeUserAvatar = null
      state.loadings.changeUserAvatar = LoadingVariants.pending
    })
    builder.addCase(changeUserAvatar.rejected, (state, { payload }) => {
      state.errors.changeUserAvatar = payload as string
      state.loadings.changeUserAvatar = LoadingVariants.failed
    })
    builder.addCase(changeUsername.fulfilled, (state, { payload }) => {
      if(state.user){
        state.user.nick = payload
      }
      state.errors.changeUsername = null
      state.loadings.changeUsername = LoadingVariants.succeeded
    })
    builder.addCase(changeUsername.pending, (state) => {
      state.errors.changeUsername = null
      state.loadings.changeUsername = LoadingVariants.pending
    })
    builder.addCase(changeUsername.rejected, (state, { payload }) => {
      state.errors.changeUsername = payload as string
      state.loadings.changeUsername = LoadingVariants.failed
    })
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      if(state.user){
        state.user.followers = payload.followers
      }
      state.errors.followUser = null
      state.loadings.followUser = LoadingVariants.succeeded
    })
    builder.addCase(followUser.pending, (state) => {
      state.errors.followUser = null
      state.loadings.followUser = LoadingVariants.pending
    })
    builder.addCase(followUser.rejected, (state, { payload }) => {
      state.errors.followUser = payload as string
      state.loadings.followUser = LoadingVariants.failed
    })
  },
})

export const { setUserData, setThemeMode } = userSlice.actions 
export const userSelector = (state: RootState) => state.user.user
export const errorsSelector = (state: RootState) => state.user.errors
export const loadingsSelector = (state: RootState) => state.user.loadings
export const themeModeSelector = (state: RootState) => state.user.themeMode
export default userSlice.reducer