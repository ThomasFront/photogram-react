import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostsState, AddPostArgType, PostType, LikePostType, LikePostArgType, AddCommentType, AddCommentArgType } from './types'
import { LoadingVariants } from '../../../types/common'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import uniqid from 'uniqid';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { RootState } from '../../store'

const initialState: PostsState = {
  posts: [],
  loadings: {
    addPost: LoadingVariants.idle,
    getPosts: LoadingVariants.idle,
    likePost: LoadingVariants.idle,
    addCommentToPost: LoadingVariants.idle,
  },
  errors: {
    addPost: null,
    getPosts: null,
    likePost: null,
    addCommentToPost: null,
  }
}

export const addPost = createAsyncThunk<PostType, AddPostArgType, {rejectValue: string}>(
  'posts/addPost',
  async ({description, image, userId, username}, { rejectWithValue }) => {
    try {
      const postId = uniqid()
      const storageRef = ref(storage, `/posts/${userId}/${postId}`)
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef)
      const postData = {
        userId,
        username,
        image: imageUrl,
        description,
        timestamp: Date.now(),
        postId,
        comments: [],
        likes: [],
      }
      await setDoc(doc(db, "posts", postId), postData);
      return postData
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const getPosts = createAsyncThunk<Array<PostType>, void, {rejectValue: string}>(
  'posts/getPosts',
  async(_, { rejectWithValue }) => {
    try {
      const posts: Array<PostType> = []
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        posts.unshift(doc.data() as PostType)
      });
      return posts
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const likePost = createAsyncThunk<LikePostArgType, LikePostType, {rejectValue: string}>(
  'posts/likePost',
  async({postId, userId}, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      const postLikes = docSnap.data()?.likes
      const currentLikes = [...postLikes]
      if(currentLikes.includes(userId)){
        const likeIndexToDelete = currentLikes.findIndex(like => like === userId)
        currentLikes.splice(likeIndexToDelete, 1)
      } else {
        currentLikes.push(userId)
      }
      await setDoc(docRef, {
        ...docSnap.data(),
        likes: currentLikes
      });
      return {
        newLikes: currentLikes,
        postId,
      }
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const addCommentToPost = createAsyncThunk<AddCommentType, AddCommentArgType, {rejectValue: string}>(
  'posts/addCommentToPost',
  async({comment, userId, username, postId}, { rejectWithValue }) => {
    try {
      const commentId = uniqid()
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      const postComments = docSnap.data()?.comments
      const currentComments = [...postComments]
      const commentData = {
        comment,
        commentId,
        username,
        userId,
      }
      currentComments.push(commentData)
      await setDoc(docRef, {
        ...docSnap.data(),
        comments: currentComments
      });
      return {
        newComments: currentComments,
        postId,
      }
    } catch (error: any) {
      return rejectWithValue(error.code)
    }
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPost.fulfilled, (state, {payload}) => {
      state.posts.unshift(payload)
      state.errors.addPost = null
      state.loadings.addPost = LoadingVariants.succeeded
    })
    builder.addCase(addPost.pending, (state) => {
      state.errors.addPost = null
      state.loadings.addPost = LoadingVariants.pending
    })
    builder.addCase(addPost.rejected, (state, { payload }) => {
      state.errors.addPost = payload as string
      state.loadings.addPost = LoadingVariants.failed
    })
    builder.addCase(getPosts.fulfilled, (state, {payload}) => {
      state.posts = payload
      state.errors.getPosts = null
      state.loadings.getPosts = LoadingVariants.succeeded
    })
    builder.addCase(getPosts.pending, (state) => {
      state.errors.getPosts = null
      state.loadings.getPosts = LoadingVariants.pending
    })
    builder.addCase(getPosts.rejected, (state, { payload }) => {
      state.errors.getPosts = payload as string
      state.loadings.getPosts = LoadingVariants.failed
    })
    builder.addCase(likePost.fulfilled, (state, {payload}) => {
      const indexToEdit = state.posts.findIndex(({postId}) => postId === payload.postId)
      state.posts[indexToEdit].likes = payload.newLikes
      state.errors.likePost = null
      state.loadings.likePost = LoadingVariants.succeeded
    })
    builder.addCase(likePost.pending, (state) => {
      state.errors.likePost = null
      state.loadings.likePost = LoadingVariants.pending
    })
    builder.addCase(likePost.rejected, (state, { payload }) => {
      state.errors.likePost = payload as string
      state.loadings.likePost = LoadingVariants.failed
    })
    builder.addCase(addCommentToPost.fulfilled, (state, {payload}) => {
      const indexToEdit = state.posts.findIndex(({postId}) => postId === payload.postId)
      state.posts[indexToEdit].comments = payload.newComments
      state.errors.addCommentToPost = null
      state.loadings.addCommentToPost = LoadingVariants.succeeded
    })
    builder.addCase(addCommentToPost.pending, (state) => {
      state.errors.addCommentToPost = null
      state.loadings.addCommentToPost = LoadingVariants.pending
    })
    builder.addCase(addCommentToPost.rejected, (state, { payload }) => {
      state.errors.addCommentToPost = payload as string
      state.loadings.addCommentToPost = LoadingVariants.failed
    })
  }
})

export const postsSelector = (state: RootState) => state.posts.posts
export const errorsSelector = (state: RootState) => state.posts.errors
export const loadingsSelector = (state: RootState) => state.posts.loadings
export default postsSlice.reducer