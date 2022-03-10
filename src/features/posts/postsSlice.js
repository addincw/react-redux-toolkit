import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

// this will merge with data state handled by createEnityAdapter
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  const response = await client.post('/fakeApi/posts', post)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(submittedPost) {
        return {
          payload: {
            ...submittedPost,
            id: nanoid(),
            date: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated(state, action) {
      const submittedPost = action.payload
      const currentPost = state.entities[submittedPost.id]

      if (currentPost) {
        currentPost.title = submittedPost.title
        currentPost.content = submittedPost.content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const currentPost = state.entities[postId]

      if (currentPost && currentPost.reactions[reaction]) {
        currentPost.reactions[reaction] += 1
        return
      }

      currentPost.reactions[reaction] = 1
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.addOne(state, action.payload)
      })
  },
})

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectAllPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export { addNewPost, fetchPosts }

export default postsSlice.reducer
